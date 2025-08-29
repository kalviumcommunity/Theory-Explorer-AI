from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize FastAPI
app = FastAPI()

# Allow CORS (React frontend can call this API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # 🔒 For production: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request body for multi-shot conversation
class ChatRequest(BaseModel):
    messages: list  # [{"role": "user", "text": "..."}, {"role": "ai", "text": "..."}]

@app.post("/ask")
async def ask_gemini(request: ChatRequest):
    try:
        # Flatten all user queries to detect style keywords
        all_queries = " ".join([msg["text"] for msg in request.messages if msg["role"] == "user"])

        # Dynamic prompting style
        style = "structured, exam-ready explanation"
        if "example" in all_queries.lower():
            style = "explanation with practical examples"
        elif "history" in all_queries.lower():
            style = "historical background with timeline"
        elif "compare" in all_queries.lower():
            style = "comparison table and bullet points"

        # System instruction
        system_instruction = f"""
You are Theory Explorer AI.
Always reply in plain explanatory text (not JSON).
Answer style: {style}.
"""

        # Convert messages into Gemini chat format
        history = []
        for msg in request.messages:
            if msg["role"] == "user":
                history.append({"role": "user", "parts": [msg["text"]]})
            else:
                history.append({"role": "model", "parts": [msg["text"]]})

        # Create model with system instruction
        model = genai.GenerativeModel(
            "gemini-1.5-flash",
            system_instruction=system_instruction
        )

        # Generate response with full conversation history + stop sequence
        response = model.generate_content(
            history,
            generation_config=genai.GenerationConfig(
                temperature=0.7,
                top_p=0.9,
                top_k=40,
                max_output_tokens=512,
                stop_sequences=["STOP", "END"]  # 👈 added stop sequence
            )
        )

        # Extract tokens safely
        tokens = {
            "input": getattr(getattr(response, "usage_metadata", {}), "prompt_token_count", 0),
            "output": getattr(getattr(response, "usage_metadata", {}), "candidates_token_count", 0),
            "total": getattr(getattr(response, "usage_metadata", {}), "total_token_count", 0),
        }

        return {"answer": response.text, "tokens": tokens}

    except Exception as e:
        print("Error:", str(e))
        return {"error": str(e)}
