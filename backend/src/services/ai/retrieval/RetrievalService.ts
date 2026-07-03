import { Concept } from "../../../models/Concept.js";
import { ILLMProvider } from "../providers/ILLMProvider.js";

export class RetrievalService {
  constructor(private provider: ILLMProvider) {}

  /**
   * Extremely simple local vector similarity for demonstration.
   * In production, this would use MongoDB $vectorSearch or Pinecone.
   */
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    if (vecA.length !== vecB.length) return 0;
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async hybridSearch(query: string, limit: number = 3): Promise<any[]> {
    // 1. Keyword search
    const keywordMatches = await Concept.find({
      $text: { $search: query }
    }).limit(limit * 2).catch(() => []); // Fallback if index not ready

    // 2. Vector search
    const [queryEmbedding] = await this.provider.embed(query);
    
    const allConcepts = await Concept.find({ embedding: { $exists: true } });
    
    const vectorMatches = allConcepts.map((c: any) => ({
      concept: c,
      score: this.cosineSimilarity(queryEmbedding, c.embedding!)
    }))
    .filter((m: any) => m.score > 0.5) // basic threshold
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, limit);

    // Combine and deduplicate
    const resultsMap = new Map();
    keywordMatches.forEach((c: any) => resultsMap.set(c._id.toString(), c));
    vectorMatches.forEach((m: any) => resultsMap.set(m.concept._id.toString(), m.concept));

    return Array.from(resultsMap.values()).slice(0, limit);
  }
}
