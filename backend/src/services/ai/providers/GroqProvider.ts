import { ILLMProvider, GenerateParams, StreamParams } from "./ILLMProvider.js";
import Groq from "groq-sdk";
import { env } from "../../../config/env.js";
import { AppError } from "../../../utils/AppError.js";

export class GroqProvider implements ILLMProvider {
  private groq: Groq;
  private modelName: string;

  constructor(apiKey?: string) {
    const key = apiKey || env.groqApiKey;
    if (!key) {
      throw new AppError("Groq API key is missing. Please check your environment variables.", 500);
    }
    this.groq = new Groq({ apiKey: key });
    this.modelName = env.groqModel;
  }

  getName(): string {
    return "Groq";
  }

  private handleError(error: any): never {
    if (error.status === 429) {
      throw new AppError("Rate limit exceeded. Please try again later.", 429);
    }
    if (error.status === 401) {
      throw new AppError("Invalid AI Provider API Key.", 500);
    }
    throw new AppError(`AI Provider Error: ${error.message}`, 500);
  }

  async generate(params: GenerateParams): Promise<string> {
    try {
      const messages: any[] = [];
      if (params.systemPrompt) {
        messages.push({ role: "system", content: params.systemPrompt });
      }
      messages.push({ role: "user", content: params.prompt });

      const completion = await this.groq.chat.completions.create({
        messages,
        model: this.modelName,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens ?? 1024,
      });

      return completion.choices[0]?.message?.content || "";
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async stream(params: StreamParams): Promise<void> {
    try {
      const messages: any[] = [];
      if (params.systemPrompt) {
        messages.push({ role: "system", content: params.systemPrompt });
      }
      messages.push({ role: "user", content: params.prompt });

      const stream = await this.groq.chat.completions.create({
        messages,
        model: this.modelName,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens ?? 1024,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          params.onChunk(content);
        }
      }
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async embed(text: string | string[]): Promise<number[][]> {
    throw new AppError("Groq currently does not support text embeddings. Please configure a separate EmbeddingProvider.", 501);
  }
}
