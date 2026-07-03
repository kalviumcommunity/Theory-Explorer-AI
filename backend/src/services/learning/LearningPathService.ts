import { LearningPath } from "../../models/LearningPath.js";
import { Concept } from "../../models/Concept.js";
import { ai } from "../ai/AIOrchestrator.js";

export class LearningPathService {
  static async getOrCreateLearningPath(userId: string, targetConceptId: string) {
    let path = await LearningPath.findOne({ user: userId, targetConcept: targetConceptId });
    if (path) return path;

    const concept = await Concept.findById(targetConceptId);
    if (!concept) throw new Error("Concept not found");

    const generatedPath = await ai.generateLearningPath(concept.title, concept.content);
    // Transform to schema structure
    const steps = (generatedPath as any[]).map((step: any) => ({
      title: step.title || step.topic,
      description: step.description,
      completed: false
    }));

    path = new LearningPath({
      user: userId,
      title: `Learning Path: ${concept.title}`,
      targetConcept: targetConceptId,
      steps,
      progress: 0
    });

    return await path.save();
  }
}
