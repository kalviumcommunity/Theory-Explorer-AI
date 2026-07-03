import { Concept } from "../../../models/Concept.js";
import { ILLMProvider } from "../providers/ILLMProvider.js";

export class EmbeddingService {
  constructor(private provider: ILLMProvider) {}

  async generateAndStoreEmbedding(conceptId: string): Promise<void> {
    const concept = await Concept.findById(conceptId);
    if (!concept) throw new Error("Concept not found");

    const textToEmbed = `${concept.title}\n${concept.summary}\n${concept.description}`;
    const [embedding] = await this.provider.embed(textToEmbed);

    concept.embedding = embedding;
    await concept.save();
  }

  async batchProcessMissingEmbeddings(): Promise<number> {
    const concepts = await Concept.find({ embedding: { $exists: false } });
    let count = 0;
    
    for (const concept of concepts) {
      try {
        await this.generateAndStoreEmbedding(concept._id.toString());
        count++;
      } catch (e) {
        console.error(`Failed to embed concept ${concept._id}`, e);
      }
    }
    
    return count;
  }
}
