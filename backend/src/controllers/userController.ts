import { Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import type { AuthRequest } from "../middleware/auth.js";

import { UserService } from "../services/userService.js";

export const getWorkspace = catchAsync(async (req: AuthRequest, res: Response) => {
  const data = await UserService.getWorkspaceStats(req.user!.id);
  sendSuccess(res, data);
});

export const getProfile = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await UserService.getProfile(req.user!.id);
  sendSuccess(res, { user });
});

export const updateProfile = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await UserService.updateProfile(req.user!.id, req.body);
  sendSuccess(res, { user }, "Profile updated successfully");
});

export const updatePreferences = catchAsync(async (req: AuthRequest, res: Response) => {
  const preferences = await UserService.updatePreferences(req.user!.id, req.body);
  sendSuccess(res, { preferences }, "Preferences updated successfully");
});
