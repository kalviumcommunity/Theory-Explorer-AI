import mongoose, { Document, Schema } from "mongoose";

export interface ILearningProgress extends Document {
  user: mongoose.Types.ObjectId;
  concept: mongoose.Types.ObjectId;
  status: "viewed" | "completed";
  lastViewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const learningProgressSchema = new Schema<ILearningProgress>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    concept: { type: Schema.Types.ObjectId, ref: "Concept", required: true },
    status: { type: String, enum: ["viewed", "completed"], default: "viewed" },
    lastViewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

learningProgressSchema.index({ user: 1, concept: 1 }, { unique: true });
learningProgressSchema.index({ user: 1, lastViewedAt: -1 });

export const LearningProgress = mongoose.model<ILearningProgress>("LearningProgress", learningProgressSchema);
