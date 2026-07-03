import { ILLMProvider, GenerateParams, StreamParams } from "./ILLMProvider.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../../config/env.js";
import { AppError } from "../../../utils/AppError.js";

export class GeminiProvider implements ILLMProvider {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey?: string) {
    const key = apiKey || env.geminiApiKey;
    if (!key) {
      throw new AppError("Gemini API key is required", 500);
    }
    this.genAI = new GoogleGenerativeAI(key);
  }

  getName(): string {
    return "Gemini";
  }

  async generate(params: GenerateParams): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const promptWithSystem = params.systemPrompt 
      ? `System: ${params.systemPrompt}\n\nUser: ${params.prompt}` 
      : params.prompt;
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: promptWithSystem }] }],
      generationConfig: {
        temperature: params.temperature ?? 0.7,
        maxOutputTokens: params.maxTokens ?? 1024,
      }
    });
    
    return result.response.text();
  }

  async stream(params: StreamParams): Promise<void> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const promptWithSystem = params.systemPrompt 
      ? `System: ${params.systemPrompt}\n\nUser: ${params.prompt}` 
      : params.prompt;
      
    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: promptWithSystem }] }],
      generationConfig: {
        temperature: params.temperature ?? 0.7,
        maxOutputTokens: params.maxTokens ?? 1024,
      }
    });

    for await (const chunk of result.stream) {
      params.onChunk(chunk.text());
    }
  }

  async embed(text: string | string[]): Promise<number[][]> {
    const model = this.genAI.getGenerativeModel({ model: "text-embedding-004" });
    const texts = Array.isArray(text) ? text : [text];
    
    const results = await Promise.all(
      texts.map(t => model.embedContent(t))
    );
    
    return results.map(r => r.embedding.values);
  }
}
