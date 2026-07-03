import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { SearchService } from "../services/searchService.js";

export const search = catchAsync(async (req: Request, res: Response) => {
  const query = req.body.query || (req.query.q as string) || "";
  
  const results = await SearchService.searchConcepts(query);
  
  sendSuccess(res, { results });
});
