import { User } from "../models/User.js";
import { Activity } from "../models/Activity.js";
import { AppError } from "../utils/AppError.js";

export class UserService {
  static async getWorkspaceStats(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    const collectionsCount = await Activity.countDocuments({ user: userId, type: "collection_create" });
    const quizzesTaken = await Activity.countDocuments({ user: userId, type: "quiz" });
    const conceptsViewed = await Activity.countDocuments({ user: userId, type: "view" });
    
    const lastActivity = await Activity.findOne({ user: userId }).sort({ createdAt: -1 });
    let streak = 0;
    if (lastActivity) {
      const diff = new Date().getTime() - new Date(lastActivity.createdAt).getTime();
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      if (diffDays <= 2) {
        streak = 1;
      }
    }

    const recentActivity = await Activity.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      stats: {
        collections: collectionsCount,
        quizzes: quizzesTaken,
        conceptsExplored: conceptsViewed,
        dayStreak: streak,
      },
      recentActivity,
      recommended: user.interests?.length > 0 ? user.interests : ["Web Development", "AI"],
    };
  }

  static async getProfile(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  static async updateProfile(userId: string, data: any) {
    const allowedFields = ["name", "username", "bio", "interests", "difficulty", "avatar"];
    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updates[field] = data[field];
      }
    }

    if (updates.username) {
      const existing = await User.findOne({ username: updates.username, _id: { $ne: userId } });
      if (existing) {
        throw new AppError("Username is already taken", 409);
      }
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  static async updatePreferences(userId: string, data: any) {
    const allowedPrefs = ["theme", "language", "explanationLevel", "aiModel", "emailNotifications"];
    const prefs: Record<string, unknown> = {};

    for (const field of allowedPrefs) {
      if (data[field] !== undefined) {
        prefs[`preferences.${field}`] = data[field];
      }
    }

    const user = await User.findByIdAndUpdate(userId, { $set: prefs }, { new: true, runValidators: true });
    if (!user) throw new AppError("User not found", 404);
    return user.preferences;
  }
}
