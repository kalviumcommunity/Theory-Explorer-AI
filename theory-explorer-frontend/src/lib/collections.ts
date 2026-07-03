import api from "./api";
import type { ApiResponse, Collection } from "./types";

export const getCollections = async () => {
  const { data } = await api.get<ApiResponse<{ collections: Collection[] }>>("/collections");
  return data.data?.collections || [];
};

export const createCollection = async (payload: { name: string; description?: string }) => {
  const { data } = await api.post<ApiResponse<{ collection: Collection }>>("/collections", payload);
  return data.data?.collection;
};

export const addConceptToCollection = async (collectionId: string, conceptId: string) => {
  const { data } = await api.post<ApiResponse<{ collection: Collection }>>(`/collections/${collectionId}/concepts`, { conceptId });
  return data.data?.collection;
};

export const removeConceptFromCollection = async (collectionId: string, conceptId: string) => {
  const { data } = await api.delete<ApiResponse<{ collection: Collection }>>(`/collections/${collectionId}/concepts/${conceptId}`);
  return data.data?.collection;
};
