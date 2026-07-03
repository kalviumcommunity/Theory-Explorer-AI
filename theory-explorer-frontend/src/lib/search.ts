import api from "./api";
import type { ApiResponse, Concept } from "./types";

export const searchConcepts = async (query: string) => {
  if (!query) return [];
  const { data } = await api.get<ApiResponse<{ results: Concept[] }>>("/search", { params: { q: query } });
  return data.data?.results || [];
};
