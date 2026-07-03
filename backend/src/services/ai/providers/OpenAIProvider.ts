import { ILLMProvider, GenerateParams, StreamParams } from "./ILLMProvider.js";
import { AppError } from "../../../utils/AppError.js";

export class OpenAIProvider implements ILLMProvider {
  getName(): string { return "OpenAI"; }
  async generate(_params: GenerateParams): Promise<string> { throw new AppError("OpenAIProvider not implemented", 501); }
  async stream(_params: StreamParams): Promise<void> { throw new AppError("OpenAIProvider not implemented", 501); }
  async embed(_text: string | string[]): Promise<number[][]> { throw new AppError("OpenAIProvider not implemented", 501); }
}
