import { Response } from "express";

export class StreamingService {
  static initStream(res: Response) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
  }

  static sendChunk(res: Response, chunk: string) {
    const data = JSON.stringify({ type: "chunk", content: chunk });
    res.write(`data: ${data}\n\n`);
  }

  static sendEnd(res: Response, metadata: any = {}) {
    const data = JSON.stringify({ type: "end", metadata });
    res.write(`data: ${data}\n\n`);
    res.end();
  }

  static sendError(res: Response, message: string) {
    const data = JSON.stringify({ type: "error", message });
    res.write(`data: ${data}\n\n`);
    res.end();
  }
}
