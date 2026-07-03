import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import type { AuthRequest } from "../middleware/auth.js";
import { AuthService } from "../services/authService.js";

const formatUserResponse = (user: any) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  createdAt: user.createdAt,
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await AuthService.register(req.body);
  sendSuccess(res, { user: formatUserResponse(user), token }, "Account created successfully", 201);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await AuthService.login(req.body);
  sendSuccess(res, { user: formatUserResponse(user), token });
});

export const getMe = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await AuthService.getMe(req.user!.id);
  sendSuccess(res, { user });
});

export const logout = catchAsync(async (_req: Request, res: Response) => {
  sendSuccess(res, null, "Logged out successfully");
});

export const googleAuth = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await AuthService.googleAuth(req.body.token);
  sendSuccess(res, { user: formatUserResponse(user), token });
});
