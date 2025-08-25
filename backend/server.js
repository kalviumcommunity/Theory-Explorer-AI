// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/ask", async (req, res) => {
  try {
    const { query } = req.body;

    // ✅ Zero-Shot Prompt
    const prompt = `
You are an AI assistant that explains theories and concepts clearly.
Task: Given a concept, provide a structured explanation with these sections:
- **Type:** (theory, method, parameter, etc.)
- **Origin/Era:** (if applicable)
- **Key Concepts:** (bullet points)
- **Current Status/Consensus:** (accepted, experimental, unproven)
- **Related Theories/Concepts:** (list related ones)
- **Safety Note:** (if relevant)

Now explain: "${query}"
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ answer: text });
  } catch (error) {
    console.error("Error in /ask:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
