import { Response, NextFunction } from "express";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import type { AuthRequest } from "../middleware/auth.js";

export const getProfile = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!.id);
  if (!user) throw new AppError("User not found", 404);
  sendSuccess(res, { user });
});

export const updateProfile = catchAsync(async (req: AuthRequest, res: Response) => {
  const allowedFields = ["name", "username", "bio", "interests", "difficulty", "avatar"];
  const updates: Record<string, unknown> = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (updates.username) {
    const existing = await User.findOne({
      username: updates.username as string,
      _id: { $ne: req.user!.id },
    });
    if (existing) throw new AppError("Username already taken", 409);
  }

  const user = await User.findByIdAndUpdate(req.user!.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new AppError("User not found", 404);

  sendSuccess(res, { user }, "Profile updated");
});

export const updatePreferences = catchAsync(async (req: AuthRequest, res: Response) => {
  const allowedPrefs = ["theme", "language", "explanationLevel", "emailNotifications"];
  const prefs: Record<string, unknown> = {};

  for (const field of allowedPrefs) {
    if (req.body[field] !== undefined) {
      prefs[field] = req.body[field];
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user!.id,
    { preferences: prefs },
    { new: true }
  );

  if (!user) throw new AppError("User not found", 404);

  sendSuccess(res, { preferences: user.preferences }, "Preferences updated");
});
