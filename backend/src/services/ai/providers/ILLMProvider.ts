export interface GenerateParams {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface StreamParams extends GenerateParams {
  onChunk: (chunk: string) => void;
}

export interface ILLMProvider {
  generate(params: GenerateParams): Promise<string>;
  stream(params: StreamParams): Promise<void>;
  embed(text: string | string[]): Promise<number[][]>;
  getName(): string;
}
