import { ILLMProvider } from "../providers/ILLMProvider.js";
import { PromptService } from "../prompts/PromptService.js";
import { RetrievalService } from "../retrieval/RetrievalService.js";
import { CitationEngine, Citation } from "./CitationEngine.js";

export class RAGPipeline {
  constructor(
    private provider: ILLMProvider,
    private retrievalService: RetrievalService,
    private citationEngine: CitationEngine
  ) {}

  async answerQuestion(question: string, userId?: string): Promise<{ answer: string; citations: Citation[] }> {
    const documents = await this.retrievalService.hybridSearch(question, 3);
    
    let context = "";
    documents.forEach((doc, i) => {
      context += `[Source ${i + 1} - ${doc.title}]: ${doc.summary}\n${doc.content}\n\n`;
    });

    if (!context) {
      context = "No direct information found in the knowledge base.";
    }

    const prompt = PromptService.getExplanationPrompt(question, "intermediate", context);
    const answer = await this.provider.generate({ prompt });
    const citations = this.citationEngine.generateCitations(documents);

    return { answer, citations };
  }
}
