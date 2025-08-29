from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize FastAPI app
app = FastAPI()

# Allow frontend (React) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 👈 for dev; later replace with ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body
class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
async def ask_gemini(request: QueryRequest):
    try:
        query = request.query

        # Dynamic style selection
        style = "exam-ready explanation"
        if "example" in query.lower():
            style = "explanation with practical examples"
        elif "history" in query.lower():
            style = "historical background with timeline"
        elif "compare" in query.lower():
            style = "comparison with bullet points"

        # System instruction
        system_instruction = f"""
You are Theory Explorer AI.
Explain in a clear, simple way. 
Answer style: {style}.
"""

        # Create Gemini model with system instruction
        model = genai.GenerativeModel(
            "gemini-1.5-flash",
            system_instruction=system_instruction
        )

        # Generate response
        response = model.generate_content(
            query,
            generation_config=genai.GenerationConfig(
                temperature=0.7,
                top_p=0.9,
                top_k=40,
                max_output_tokens=512,
            )
        )

        # Extract text
        answer_text = response.text.strip() if response.text else "No response."

        # Token usage (if available)
        tokens = {
            "input": getattr(response.usage_metadata, "prompt_token_count", 0),
            "output": getattr(response.usage_metadata, "candidates_token_count", 0),
            "total": getattr(response.usage_metadata, "total_token_count", 0),
        }

        return {"answer": answer_text, "tokens": tokens}

    except Exception as e:
        print("Error:", str(e))
        return {"error": str(e)}
