import { Router } from "express";
import { Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { protect, AuthRequest } from "../middleware/auth.js";
import { PracticeService } from "../services/practice/PracticeService.js";

const router = Router();
router.use(protect);

router.get("/flashcards/:conceptId", catchAsync(async (req: AuthRequest, res: Response) => {
  const cards = await PracticeService.getFlashcards(req.user!.id, req.params.conceptId as string);
  sendSuccess(res, { cards });
}));

router.post("/flashcards/:cardId/review", catchAsync(async (req: AuthRequest, res: Response) => {
  const card = await PracticeService.reviewFlashcard(req.params.cardId as string, req.body.quality);
  sendSuccess(res, { card });
}));

router.post("/quiz", catchAsync(async (req: AuthRequest, res: Response) => {
  const { conceptId, score, totalQuestions, difficulty } = req.body;
  const result = await PracticeService.submitQuizResult(req.user!.id, conceptId, score, totalQuestions, difficulty);
  sendSuccess(res, { result });
}));

export default router;
