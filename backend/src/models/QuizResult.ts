import mongoose, { Document, Schema } from "mongoose";

export interface IQuizResult extends Document {
  user: mongoose.Types.ObjectId;
  concept: mongoose.Types.ObjectId;
  score: number;
  totalQuestions: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  passed: boolean;
  createdAt: Date;
}

const quizResultSchema = new Schema<IQuizResult>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    concept: { type: Schema.Types.ObjectId, ref: "Concept", required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
    passed: { type: Boolean, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

quizResultSchema.index({ user: 1, concept: 1 });
quizResultSchema.index({ user: 1, createdAt: -1 });

export const QuizResult = mongoose.model<IQuizResult>("QuizResult", quizResultSchema);
