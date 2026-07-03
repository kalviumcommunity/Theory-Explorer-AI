import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { ai } from "../services/ai/AIOrchestrator.js";
import type { AuthRequest } from "../middleware/auth.js";

export const chatStream = catchAsync(async (req: AuthRequest, res: Response) => {
  const { question } = req.body;
  if (!question) {
    res.status(400).json({ error: "Question is required" });
    return;
  }
  await ai.streamChat(question, res, req.user?.id);
});

export const explainConcept = catchAsync(async (req: AuthRequest, res: Response) => {
  const { concept, difficulty, context } = req.body;
  const explanation = await ai.generateExplanation(concept, difficulty || "intermediate", context);
  sendSuccess(res, { explanation });
});

export const compareConcepts = catchAsync(async (req: AuthRequest, res: Response) => {
  const { conceptA, conceptB, context } = req.body;
  const comparison = await ai.compareConcepts(conceptA, conceptB, context);
  sendSuccess(res, { comparison });
});

export const explainCode = catchAsync(async (req: AuthRequest, res: Response) => {
  const { concept, code, context } = req.body;
  const explanation = await ai.explainCode(concept, code, context);
  sendSuccess(res, { explanation });
});

export const generateQuiz = catchAsync(async (req: AuthRequest, res: Response) => {
  const { concept, context } = req.body;
  const quiz = await ai.generateQuiz(concept, context);
  sendSuccess(res, { quiz });
});

export const generateFlashcards = catchAsync(async (req: AuthRequest, res: Response) => {
  const { concept, context } = req.body;
  const flashcards = await ai.generateFlashcards(concept, context);
  sendSuccess(res, { flashcards });
});

export const generateLearningPath = catchAsync(async (req: AuthRequest, res: Response) => {
  const { concept, context } = req.body;
  const learningPath = await ai.generateLearningPath(concept, context);
  sendSuccess(res, { learningPath });
});
