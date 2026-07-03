import { Collection } from "../models/Collection.js";
import { AppError } from "../utils/AppError.js";

export class CollectionService {
  static async getUserCollections(userId: string) {
    return await Collection.find({ user: userId })
      .populate("concepts", "title slug difficulty estimatedReadingTime category")
      .sort({ updatedAt: -1 });
  }

  static async createCollection(userId: string, data: { name: string; description?: string; isPublic?: boolean }) {
    return await Collection.create({
      ...data,
      user: userId,
      concepts: [],
    });
  }

  static async updateCollection(userId: string, collectionId: string, data: any) {
    const collection = await Collection.findOneAndUpdate(
      { _id: collectionId, user: userId },
      data,
      { new: true, runValidators: true }
    );
    if (!collection) throw new AppError("Collection not found or unauthorized", 404);
    return collection;
  }

  static async deleteCollection(userId: string, collectionId: string) {
    const collection = await Collection.findOneAndDelete({ _id: collectionId, user: userId });
    if (!collection) throw new AppError("Collection not found or unauthorized", 404);
  }

  static async addConcept(userId: string, collectionId: string, conceptId: string) {
    const collection = await Collection.findOneAndUpdate(
      { _id: collectionId, user: userId },
      { $addToSet: { concepts: conceptId } },
      { new: true }
    );
    if (!collection) throw new AppError("Collection not found", 404);
    return collection;
  }

  static async removeConcept(userId: string, collectionId: string, conceptId: string) {
    const collection = await Collection.findOneAndUpdate(
      { _id: collectionId, user: userId },
      { $pull: { concepts: conceptId } },
      { new: true }
    );
    if (!collection) throw new AppError("Collection not found", 404);
    return collection;
  }
}
