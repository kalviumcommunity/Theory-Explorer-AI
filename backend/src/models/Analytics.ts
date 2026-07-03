import mongoose, { Document, Schema } from "mongoose";

export interface IAnalytics extends Document {
  user: mongoose.Types.ObjectId;
  learningStreak: number;
  lastActiveDate: Date;
  totalTimeSpent: number; // in minutes
  conceptsLearned: number;
  weakTopics: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const analyticsSchema = new Schema<IAnalytics>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    learningStreak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: Date.now },
    totalTimeSpent: { type: Number, default: 0 },
    conceptsLearned: { type: Number, default: 0 },
    weakTopics: [{ type: Schema.Types.ObjectId, ref: "Concept" }],
  },
  { timestamps: true }
);

export const Analytics = mongoose.model<IAnalytics>("Analytics", analyticsSchema);
