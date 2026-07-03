import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Activity } from "../models/Activity.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { env } from "../config/env.js";
import type { AuthRequest } from "../middleware/auth.js";

function signToken(id: string): string {
  return jwt.sign({ id }, env.jwt.secret, { expiresIn: env.jwt.expiresIn } as jwt.SignOptions);
}

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const user = await User.create({ name, email, password });
  const token = signToken(user.id);

  await Activity.create({
    user: user.id,
    type: "view",
    metadata: { action: "account_created" },
  });

  sendSuccess(
    res,
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
    },
    "Account created successfully",
    201
  );
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError("Account is deactivated", 403);
  }

  user.lastLogin = new Date();
  await user.save();

  const token = signToken(user.id);

  await Activity.create({
    user: user.id,
    type: "view",
    metadata: { action: "login" },
  });

  sendSuccess(res, {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
    token,
  });
});

export const getMe = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!.id);
  if (!user) throw new AppError("User not found", 404);

  sendSuccess(res, { user });
});

export const logout = catchAsync(async (_req: Request, res: Response) => {
  sendSuccess(res, null, "Logged out successfully");
});
