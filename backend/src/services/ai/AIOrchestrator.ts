import { ILLMProvider } from "./providers/ILLMProvider.js";
import { ProviderManager } from "./providers/ProviderManager.js";
import { PromptService } from "./prompts/PromptService.js";
import { RetrievalService } from "./retrieval/RetrievalService.js";
import { RAGPipeline } from "./orchestrator/RAGPipeline.js";
import { CitationEngine } from "./orchestrator/CitationEngine.js";
import { StreamingService } from "./pipeline/StreamingService.js";
import { ResponseFormatter } from "./pipeline/ResponseFormatter.js";
import { EmbeddingService } from "./embeddings/EmbeddingService.js";
import { Response } from "express";
import { AppError } from "../../utils/AppError.js";

export class AIOrchestrator {
  public provider: ILLMProvider;
  public embeddingProvider: ILLMProvider;
  public retrievalService: RetrievalService;
  public citationEngine: CitationEngine;
  public ragPipeline: RAGPipeline;
  public embeddingService: EmbeddingService;

  constructor() {
    this.provider = ProviderManager.getProvider();
    
    try {
      this.embeddingProvider = ProviderManager.getEmbeddingProvider();
      this.embeddingService = new EmbeddingService(this.embeddingProvider);
      this.retrievalService = new RetrievalService(this.embeddingProvider);
      this.citationEngine = new CitationEngine();
      this.ragPipeline = new RAGPipeline(this.provider, this.retrievalService, this.citationEngine);
    } catch (error) {
      console.warn("RAG Pipeline and Embeddings disabled:", (error as Error).message);
      this.retrievalService = null as any;
      this.citationEngine = null as any;
      this.ragPipeline = null as any;
      this.embeddingService = null as any;
      this.embeddingProvider = null as any;
    }
  }

  private async safeGenerate(prompt: string, temperature = 0.7): Promise<string> {
    try {
      return await this.provider.generate({ prompt, temperature });
    } catch (error: any) {
      console.error("AI Generation Error:", error);
      throw new AppError(error.message || "Failed to generate AI response", 500);
    }
  }

  async streamChat(question: string, res: Response, userId?: string) {
    if (!this.ragPipeline) {
      StreamingService.initStream(res);
      StreamingService.sendError(res, "RAG Pipeline is not configured on this server.");
      return;
    }
    
    StreamingService.initStream(res);
    try {
      const documents = await this.retrievalService.hybridSearch(question, 3);
      
      let context = "";
      documents.forEach((doc: any, i: number) => {
        context += `[Source ${i + 1} - ${doc.title}]: ${doc.summary}\n${doc.content}\n\n`;
      });
      if (!context) {
        context = "No direct information found in the knowledge base.";
      }

      // Using the generic prompt logic since chat is an explanation flow in RAG
      const prompt = PromptService.getExplanationPrompt(question, "intermediate", context); 

      await this.provider.stream({
        prompt,
        onChunk: (chunk: string) => StreamingService.sendChunk(res, chunk)
      });

      const citations = this.citationEngine.generateCitations(documents);
      StreamingService.sendEnd(res, { citations });

    } catch (error: any) {
      console.error("AI Orchestrator Error:", error);
      StreamingService.sendError(res, error.message || "Internal AI Error");
    }
  }

  async generateExplanation(concept: string, difficulty: "beginner" | "intermediate" | "advanced", context: string = "") {
    const prompt = PromptService.getExplanationPrompt(concept, difficulty, context);
    return await this.safeGenerate(prompt);
  }

  async compareConcepts(conceptA: string, conceptB: string, context: string = "") {
    const prompt = PromptService.getComparePrompt(conceptA, conceptB, context);
    return await this.safeGenerate(prompt);
  }

  async explainCode(concept: string, code: string, context: string = "") {
    const prompt = PromptService.getCodeExplanationPrompt(concept, code, context);
    return await this.safeGenerate(prompt);
  }

  async generateQuiz(concept: string, context: string = "") {
    const prompt = PromptService.getQuizPrompt(concept, context);
    const result = await this.safeGenerate(prompt, 0.2); 
    return ResponseFormatter.extractJson(result);
  }

  async generateFlashcards(concept: string, context: string = "") {
    const prompt = PromptService.getFlashcardPrompt(concept, context);
    const result = await this.safeGenerate(prompt, 0.2); 
    return ResponseFormatter.extractJson(result);
  }

  async generateLearningPath(concept: string, context: string = "") {
    const prompt = PromptService.getLearningPathPrompt(concept, context);
    const result = await this.safeGenerate(prompt, 0.3); 
    return ResponseFormatter.extractJson(result);
  }
}

export const ai = new AIOrchestrator();
