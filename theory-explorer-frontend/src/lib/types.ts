export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  username?: string;
  bio?: string;
  interests: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  preferences: UserPreferences;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  explanationLevel: "beginner" | "intermediate" | "advanced";
  emailNotifications: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface Activity {
  id: string;
  type: "search" | "view" | "quiz" | "flashcard" | "collection_create" | "concept_save";
  metadata?: Record<string, unknown>;
  createdAt: string;
}
