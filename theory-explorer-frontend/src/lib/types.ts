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
  role: "user" | "admin";
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  explanationLevel: "beginner" | "intermediate" | "advanced";
  aiModel?: "gpt-4" | "gemini-1.5" | "claude-3";
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

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Concept {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  content: string;
  category: Category | string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedReadingTime: number;
  references: Array<{ title: string; url: string }>;
  status: "draft" | "published" | "archived";
  createdAt: string;
}

export interface Collection {
  _id: string;
  name: string;
  description?: string;
  user: string;
  concepts: Concept[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  _id: string;
  concept: Concept;
  folder?: string;
  notes?: string;
  createdAt: string;
}

export interface LearningProgress {
  viewed: number;
  completed: number;
}
