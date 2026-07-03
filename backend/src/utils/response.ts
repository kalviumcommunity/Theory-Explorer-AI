import { Response } from "express";

interface ApiResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  data?: T;
  errors?: unknown;
}

export function sendSuccess<T>(res: Response, data?: T, message?: string, statusCode = 200): void {
  const body: ApiResponse<T> = { status: "success" };
  if (message) body.message = message;
  if (data !== undefined) body.data = data;
  res.status(statusCode).json(body);
}

export function sendError(res: Response, statusCode: number, message: string, errors?: unknown): void {
  const body: ApiResponse = { status: "error", message };
  if (errors) body.errors = errors;
  res.status(statusCode).json(body);
}
