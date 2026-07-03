import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { ProgressService } from "../services/progressService.js";
import type { AuthRequest } from "../middleware/auth.js";

export const getHistory = catchAsync(async (req: AuthRequest, res: Response) => {
  const history = await ProgressService.getHistory(req.user!.id);
  sendSuccess(res, { history });
});

export const getProgress = catchAsync(async (req: AuthRequest, res: Response) => {
  const stats = await ProgressService.getProgress(req.user!.id);
  sendSuccess(res, { stats });
});

export const trackView = catchAsync(async (req: AuthRequest, res: Response) => {
  const progress = await ProgressService.trackView(req.user!.id, req.body.conceptId);
  sendSuccess(res, { progress });
});
