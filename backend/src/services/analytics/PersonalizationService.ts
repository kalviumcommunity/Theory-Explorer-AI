import { Analytics } from "../../models/Analytics.js";
import { Concept } from "../../models/Concept.js";

export class PersonalizationService {
  static async getRecommendedTopics(userId: string) {
    const analytics = await Analytics.findOne({ user: userId });
    
    // If they have weak topics, prioritize them
    if (analytics && analytics.weakTopics && analytics.weakTopics.length > 0) {
      return await Concept.find({ _id: { $in: analytics.weakTopics } }).limit(3);
    }
    
    // Otherwise, just return some intermediate topics to learn
    return await Concept.find({ difficulty: "intermediate" }).limit(3);
  }
}
