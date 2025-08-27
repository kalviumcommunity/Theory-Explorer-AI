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

# Allow CORS (React will call this API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Change to ["http://localhost:5173"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request body
class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
async def ask_gemini(request: QueryRequest):
    try:
        query = request.query

        # 🪄 Dynamic prompting style
        style = "structured, exam-ready explanation"
        if "example" in query.lower():
            style = "explanation with practical examples"
        elif "history" in query.lower():
            style = "historical background with timeline"
        elif "compare" in query.lower():
            style = "comparison table and bullet points"

        # ✅ Define system + user prompts
        system_instruction = f"""
You are Theory Explorer AI.
Always reply ONLY in valid JSON. No extra text.
Use this structure:
{{
  "type": "string",
  "origin_era": "string",
  "key_concepts": ["list of strings"],
  "current_status": "string",
  "related_theories": ["list of strings"],
  "safety_note": "string"
}}
Answer style: {style}.
        """

        user_prompt = f"Question: {query}"

        # ✅ Create model with system instruction
        model = genai.GenerativeModel(
            "gemini-1.5-flash",
            system_instruction=system_instruction
        )

        # ✅ Generate response
        response = model.generate_content(
            [user_prompt],
            generation_config=genai.GenerationConfig(
                temperature=0.7,
                top_p=0.9,
                top_k=40,
                max_output_tokens=512,
            )
        )

        return {"answer": response.text}

    except Exception as e:
        print("Error:", str(e))
        return {"error": str(e)}
