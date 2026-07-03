import { Router } from "express";
import { Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { protect, AuthRequest } from "../middleware/auth.js";
import { AnalyticsService } from "../services/analytics/AnalyticsService.js";
import { PersonalizationService } from "../services/analytics/PersonalizationService.js";

const router = Router();
router.use(protect);

router.get("/", catchAsync(async (req: AuthRequest, res: Response) => {
  const analytics = await AnalyticsService.getAnalytics(req.user!.id);
  sendSuccess(res, { analytics });
}));

router.get("/recommendations", catchAsync(async (req: AuthRequest, res: Response) => {
  const recommendations = await PersonalizationService.getRecommendedTopics(req.user!.id);
  sendSuccess(res, { recommendations });
}));

router.post("/activity", catchAsync(async (req: AuthRequest, res: Response) => {
  const analytics = await AnalyticsService.recordActivity(req.user!.id, req.body.timeSpentMinutes);
  sendSuccess(res, { analytics });
}));

export default router;
