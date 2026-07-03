import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { CategoryService } from "../services/categoryService.js";

export const getCategories = catchAsync(async (_req: Request, res: Response) => {
  const categories = await CategoryService.getAll();
  sendSuccess(res, { categories });
});
