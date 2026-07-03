import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { sendError } from "../utils/response.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    sendError(res, err.statusCode, err.message);
    return;
  }

  console.error("[ERROR]", err);

  sendError(res, 500, "Internal server error");
}
