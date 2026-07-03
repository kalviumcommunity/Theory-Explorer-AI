import { Analytics } from "../../models/Analytics.js";

export class AnalyticsService {
  static async recordActivity(userId: string, timeSpentMinutes: number) {
    let analytics = await Analytics.findOne({ user: userId });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!analytics) {
      analytics = new Analytics({
        user: userId,
        learningStreak: 1,
        lastActiveDate: new Date(),
        totalTimeSpent: timeSpentMinutes
      });
    } else {
      const lastActive = new Date(analytics.lastActiveDate);
      lastActive.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(today.getTime() - lastActive.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays === 1) {
        analytics.learningStreak += 1;
      } else if (diffDays > 1) {
        analytics.learningStreak = 1;
      }
      
      analytics.lastActiveDate = new Date();
      analytics.totalTimeSpent += timeSpentMinutes;
    }
    
    await analytics.save();
    return analytics;
  }
  
  static async getAnalytics(userId: string) {
    return await Analytics.findOne({ user: userId }).populate("weakTopics", "title slug");
  }
}
