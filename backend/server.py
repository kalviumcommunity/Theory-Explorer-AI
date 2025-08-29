from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
import faiss
import numpy as np
from dotenv import load_dotenv

# Load .env
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize FastAPI
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ VECTOR DB SETUP (FAISS) ============
embedding_dim = 768  # Gemini returns 768-d embeddings
index = faiss.IndexFlatL2(embedding_dim)  # L2 distance
doc_store = []  # store texts alongside vectors

def get_embedding(text: str):
    result = genai.embed_content(
        model="models/embedding-001",
        content=text
    )
    return np.array(result["embedding"], dtype="float32")

def add_to_index(text: str):
    vector = get_embedding(text)
    index.add(np.array([vector]))
    doc_store.append(text)

def search_index(query: str, k: int = 3):
    query_vec = get_embedding(query)
    D, I = index.search(np.array([query_vec]), k)
    results = [doc_store[i] for i in I[0] if i < len(doc_store)]
    return results

# ============ API ROUTES ============

class ChatRequest(BaseModel):
    messages: list  # [{"role":"user","text":"..."}, ...]

@app.post("/ask")
async def ask_gemini(request: ChatRequest):
    try:
        # Latest user query
        latest_query = request.messages[-1]["text"]

        # Search vector DB for context
        retrieved_docs = search_index(latest_query, k=3)
        context = "\n".join(retrieved_docs) if retrieved_docs else "No extra context."

        # Add this query to DB for memory
        add_to_index(latest_query)

        # Build conversation history
        history = []
        for msg in request.messages:
            if msg["role"] == "user":
                history.append({"role": "user", "parts": [msg["text"]]})
            else:
                history.append({"role": "model", "parts": [msg["text"]]})

        # Add retrieved knowledge into system instruction
        system_instruction = f"""
You are Theory Explorer AI.
Use the following knowledge base context when relevant:
{context}

Always reply in plain explanatory text (no JSON).
"""

        # Run Gemini
        model = genai.GenerativeModel(
            "gemini-1.5-flash",
            system_instruction=system_instruction
        )

        response = model.generate_content(history)

        # Extract plain answer
        answer = response.text or "I couldn't generate an answer."

        return {"answer": answer, "retrieved": retrieved_docs}

    except Exception as e:
        print("Error:", str(e))
        return {"error": str(e)}
