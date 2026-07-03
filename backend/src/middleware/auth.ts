import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export async function protect(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.jwt.secret) as { id: string };

    const user = await User.findById(decoded.id).select("id email name role isActive");
    if (!user || !user.isActive) {
      throw new AppError("User not found or inactive", 401);
    }

    req.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError("Invalid or expired token", 401));
  }
}

export function restrictTo(...roles: string[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }
    next();
  };
}
