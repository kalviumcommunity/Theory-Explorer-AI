import api from "./api";
import type { ApiResponse, LearningProgress } from "./types";

export const getHistory = async () => {
  const { data } = await api.get<ApiResponse<{ history: any[] }>>("/progress/history");
  return data.data?.history || [];
};

export const getProgressStats = async () => {
  const { data } = await api.get<ApiResponse<{ stats: LearningProgress }>>("/progress/stats");
  return data.data?.stats;
};

export const trackView = async (conceptId: string) => {
  const { data } = await api.post<ApiResponse<{ progress: any }>>("/progress/track", { conceptId });
  return data.data?.progress;
};
