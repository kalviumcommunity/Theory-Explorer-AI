import { LearningProgress } from "../models/LearningProgress.js";

export class ProgressService {
  static async getHistory(userId: string) {
    return await LearningProgress.find({ user: userId })
      .populate({
        path: "concept",
        select: "title slug summary difficulty estimatedReadingTime category",
        populate: { path: "category", select: "name slug" }
      })
      .sort({ lastViewedAt: -1 })
      .limit(20);
  }

  static async getProgress(userId: string) {
    const stats = await LearningProgress.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    
    return {
      viewed: stats.find(s => s._id === "viewed")?.count || 0,
      completed: stats.find(s => s._id === "completed")?.count || 0
    };
  }

  static async trackView(userId: string, conceptId: string) {
    return await LearningProgress.findOneAndUpdate(
      { user: userId, concept: conceptId },
      { $set: { lastViewedAt: new Date() }, $setOnInsert: { status: "viewed" } },
      { upsert: true, new: true }
    );
  }
}
