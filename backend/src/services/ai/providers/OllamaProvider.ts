import { ILLMProvider, GenerateParams, StreamParams } from "./ILLMProvider.js";
import { Ollama } from "ollama";
import { env } from "../../../config/env.js";

export class OllamaProvider implements ILLMProvider {
  private ollama: Ollama;
  private chatModelName: string = "llama3.1";
  private embedModelName: string = "nomic-embed-text";

  constructor() {
    this.ollama = new Ollama({ host: env.ollamaBaseUrl });
  }

  getName(): string {
    return "Ollama";
  }

  async generate(params: GenerateParams): Promise<string> {
    const messages: any[] = [];
    if (params.systemPrompt) {
      messages.push({ role: "system", content: params.systemPrompt });
    }
    messages.push({ role: "user", content: params.prompt });

    const response = await this.ollama.chat({
      model: this.chatModelName,
      messages,
      options: {
        temperature: params.temperature ?? 0.7,
      }
    });

    return response.message.content;
  }

  async stream(params: StreamParams): Promise<void> {
    const messages: any[] = [];
    if (params.systemPrompt) {
      messages.push({ role: "system", content: params.systemPrompt });
    }
    messages.push({ role: "user", content: params.prompt });

    const response = await this.ollama.chat({
      model: this.chatModelName,
      messages,
      stream: true,
      options: {
        temperature: params.temperature ?? 0.7,
      }
    });

    for await (const chunk of response) {
      params.onChunk(chunk.message.content);
    }
  }

  async embed(text: string | string[]): Promise<number[][]> {
    const texts = Array.isArray(text) ? text : [text];
    const embeddings: number[][] = [];
    
    for (const t of texts) {
      const response = await this.ollama.embeddings({
        model: this.embedModelName,
        prompt: t
      });
      embeddings.push(response.embedding);
    }

    return embeddings;
  }
}
