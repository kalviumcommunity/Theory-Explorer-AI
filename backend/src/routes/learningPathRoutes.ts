import { Router } from "express";
import { Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { protect, AuthRequest } from "../middleware/auth.js";
import { LearningPathService } from "../services/learning/LearningPathService.js";

const router = Router();
router.use(protect);

router.get("/:conceptId", catchAsync(async (req: AuthRequest, res: Response) => {
  const path = await LearningPathService.getOrCreateLearningPath(req.user!.id, req.params.conceptId as string);
  sendSuccess(res, { path });
}));

export default router;
