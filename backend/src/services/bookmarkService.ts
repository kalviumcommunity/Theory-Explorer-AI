import { Bookmark } from "../models/Bookmark.js";
import { AppError } from "../utils/AppError.js";

export class BookmarkService {
  static async getUserBookmarks(userId: string) {
    return await Bookmark.find({ user: userId })
      .populate({
        path: "concept",
        select: "title slug summary difficulty estimatedReadingTime category",
        populate: { path: "category", select: "name slug" }
      })
      .sort({ createdAt: -1 });
  }

  static async addBookmark(userId: string, conceptId: string) {
    try {
      const bookmark = await Bookmark.create({ user: userId, concept: conceptId });
      return bookmark;
    } catch (error: any) {
      if (error.code === 11000) throw new AppError("Concept already bookmarked", 400);
      throw error;
    }
  }

  static async removeBookmark(userId: string, id: string) {
    const bookmark = await Bookmark.findOneAndDelete({ _id: id, user: userId });
    if (!bookmark) throw new AppError("Bookmark not found", 404);
  }
}
