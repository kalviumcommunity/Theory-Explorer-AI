import api from "./api";
import type { ApiResponse, Bookmark } from "./types";

export const getBookmarks = async () => {
  const { data } = await api.get<ApiResponse<{ bookmarks: Bookmark[] }>>("/bookmarks");
  return data.data?.bookmarks || [];
};

export const addBookmark = async (conceptId: string) => {
  const { data } = await api.post<ApiResponse<{ bookmark: Bookmark }>>("/bookmarks", { conceptId });
  return data.data?.bookmark;
};

export const removeBookmark = async (id: string) => {
  await api.delete(`/bookmarks/${id}`);
};
