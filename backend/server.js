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

    let style = "structured, exam-ready explanation"; // default
    if (query.toLowerCase().includes("example")) {
      style = "explanation with practical examples";
    } else if (query.toLowerCase().includes("history")) {
      style = "historical background with timeline";
    } else if (query.toLowerCase().includes("compare")) {
      style = "comparison table and bullet points";
    }

    const prompt = `
You are Theory Explorer AI.
Task: Answer clearly with ${style}.
Sections to include:
- Type
- Origin/Era
- Key Concepts
- Current Status/Consensus
- Related Theories
- Safety Note (if relevant)

Question: "${query}"
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // ✅ Extract token usage
    const usage = result.response.usageMetadata;

    res.json({
      answer: text,
      tokens: {
        input: usage.promptTokenCount || 0,
        output: usage.candidatesTokenCount || 0,
        total: usage.totalTokenCount || 0,
      },
    });
  } catch (error) {
    console.error("Error in /ask:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
