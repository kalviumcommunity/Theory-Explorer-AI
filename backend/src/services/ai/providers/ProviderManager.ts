import { ILLMProvider } from "./ILLMProvider.js";
import { GroqProvider } from "./GroqProvider.js";
import { OllamaProvider } from "./OllamaProvider.js";
import { GeminiProvider } from "./GeminiProvider.js";
import { OpenAIProvider } from "./OpenAIProvider.js";
import { GLMProvider } from "./GLMProvider.js";
import { env } from "../../../config/env.js";
import { AppError } from "../../../utils/AppError.js";

export class ProviderManager {
  static getProvider(): ILLMProvider {
    const providerStr = env.aiProvider.toLowerCase();
    switch (providerStr) {
      case "gemini":
        return new GeminiProvider();
      case "ollama":
        return new OllamaProvider();
      case "openai":
        return new OpenAIProvider();
      case "glm":
        return new GLMProvider();
      case "groq":
      default:
        return new GroqProvider(); // Groq is the default
    }
  }

  static getEmbeddingProvider(): ILLMProvider {
    const providerStr = env.aiProvider.toLowerCase();
    if (providerStr === "groq") {
       throw new AppError("Groq does not provide embeddings. Please configure a fallback provider in ProviderManager.", 501);
    }
    return this.getProvider();
  }
}
