import { Concept } from "../models/Concept.js";
import { AppError } from "../utils/AppError.js";

export class ConceptService {
  static async getAll(query: any = {}) {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.category) filter.category = query.category;
    if (query.difficulty) filter.difficulty = query.difficulty;
    if (query.tag) filter.tags = query.tag;

    let sort: any = { createdAt: -1 };
    if (query.sort === "popular") sort = { estimatedReadingTime: -1 }; // Dummy sort for popular

    const concepts = await Concept.find(filter)
      .populate("category", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Concept.countDocuments(filter);

    return {
      concepts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getBySlug(slug: string) {
    const concept = await Concept.findOne({ slug })
      .populate("category", "name slug")
      .populate("createdBy", "name avatar");
    
    if (!concept) throw new AppError("Concept not found", 404);
    return concept;
  }
}
