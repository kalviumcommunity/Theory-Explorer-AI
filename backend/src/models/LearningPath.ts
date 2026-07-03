import mongoose, { Document, Schema } from "mongoose";

export interface ILearningPath extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  targetConcept: mongoose.Types.ObjectId;
  steps: Array<{
    title: string;
    description: string;
    completed: boolean;
  }>;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

const learningPathSchema = new Schema<ILearningPath>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    targetConcept: { type: Schema.Types.ObjectId, ref: "Concept", required: true },
    steps: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

learningPathSchema.index({ user: 1, targetConcept: 1 });

export const LearningPath = mongoose.model<ILearningPath>("LearningPath", learningPathSchema);
