import mongoose, { Document, Schema } from "mongoose";

export interface IConcept extends Document {
  title: string;
  slug: string;
  summary: string;
  description: string;
  content: string; // Markdown
  category: mongoose.Types.ObjectId;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedReadingTime: number; // in minutes
  references: Array<{ title: string; url: string }>;
  status: "draft" | "published" | "archived";
  version: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const conceptSchema = new Schema<IConcept>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [{ type: String, trim: true }],
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
    estimatedReadingTime: { type: Number, required: true },
    references: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    version: { type: Number, default: 1 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

conceptSchema.index({ title: "text", summary: "text", tags: "text" }); // For text search

export const Concept = mongoose.model<IConcept>("Concept", conceptSchema);
