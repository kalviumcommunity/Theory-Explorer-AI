import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/response.js";
import { BookmarkService } from "../services/bookmarkService.js";
import type { AuthRequest } from "../middleware/auth.js";

export const getBookmarks = catchAsync(async (req: AuthRequest, res: Response) => {
  const bookmarks = await BookmarkService.getUserBookmarks(req.user!.id);
  sendSuccess(res, { bookmarks });
});

export const addBookmark = catchAsync(async (req: AuthRequest, res: Response) => {
  const bookmark = await BookmarkService.addBookmark(req.user!.id, req.body.conceptId);
  sendSuccess(res, { bookmark }, "Bookmark added", 201);
});

export const removeBookmark = catchAsync(async (req: AuthRequest, res: Response) => {
  await BookmarkService.removeBookmark(req.user!.id, req.params.id as string);
  sendSuccess(res, null, "Bookmark removed");
});
