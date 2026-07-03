import api from "./api";
import type { ApiResponse, Concept, Category } from "./types";

export const getConcepts = async (params: any = {}) => {
  const { data } = await api.get<ApiResponse<{ concepts: Concept[], pagination: any }>>("/concepts", { params });
  return data.data;
};

export const getConcept = async (slug: string) => {
  const { data } = await api.get<ApiResponse<{ concept: Concept }>>(`/concepts/${slug}`);
  return data.data?.concept;
};

export const getCategories = async () => {
  const { data } = await api.get<ApiResponse<{ categories: Category[] }>>("/categories");
  return data.data?.categories || [];
};
