import api from "./api";
import type { ApiResponse } from "./types";

export const getExplanation = async (concept: string, difficulty: string) => {
  const { data } = await api.post<ApiResponse<{ explanation: string }>>("/ai/explain", { concept, difficulty });
  return data.data?.explanation;
};

export const getQuiz = async (concept: string, context: string) => {
  const { data } = await api.post<ApiResponse<{ quiz: any }>>("/ai/quiz", { concept, context });
  return data.data?.quiz;
};

export const streamChat = async (question: string, onChunk: (text: string) => void): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:4000/api/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ question })
  });

  if (!response.ok) {
    throw new Error("Failed to start chat stream");
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let metadata = null;

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunkStr = decoder.decode(value);
      const lines = chunkStr.split("\n\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const dataStr = line.replace("data: ", "");
          try {
            const data = JSON.parse(dataStr);
            if (data.type === "chunk") {
              onChunk(data.content);
            } else if (data.type === "end") {
              metadata = data.metadata;
            } else if (data.type === "error") {
              throw new Error(data.message);
            }
          } catch (e) {
            // chunk may be split across reads
          }
        }
      }
    }
  }
  return metadata;
};
