import dotenv from "dotenv";
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "4000", 10),
  mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/concept-atlas",
  jwt: {
    secret: process.env.JWT_SECRET || "fallback-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  geminiApiKey: process.env.GEMINI_API_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
  groqApiKey: process.env.GROQ_API_KEY,
  aiProvider: process.env.AI_PROVIDER || "groq",
  groqModel: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434",
  chromaUrl: process.env.CHROMA_URL || "http://127.0.0.1:8000",
};
