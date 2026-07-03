import api from "./api"
import type { ApiResponse, User } from "./types"

export async function fetchProfile(): Promise<User> {
  const res = await api.get<ApiResponse<{ user: User }>>("/users/profile")
  return res.data.data!.user
}

export async function updateProfile(data: Partial<User>): Promise<User> {
  const res = await api.put<ApiResponse<{ user: User }>>("/users/profile", data)
  return res.data.data!.user
}

export async function updatePreferences(prefs: Partial<User["preferences"]>): Promise<User["preferences"]> {
  const res = await api.put<ApiResponse<{ preferences: User["preferences"] }>>("/users/preferences", prefs)
  return res.data.data!.preferences
}
