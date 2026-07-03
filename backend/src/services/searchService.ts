import { Concept } from "../models/Concept.js";

export class SearchService {
  static async searchConcepts(query: string, limit: number = 10) {
    if (!query) return [];
    
    const searchRegex = new RegExp(query, "i");
    
    // Future Sprint 4: We will integrate semantic search embeddings here.
    const concepts = await Concept.find({
      $or: [
        { title: searchRegex },
        { summary: searchRegex },
        { tags: searchRegex },
      ],
      // status: "published"
    })
    .populate("category", "name slug")
    .select("title slug summary difficulty estimatedReadingTime tags category")
    .limit(limit);

    return concepts;
  }
}
