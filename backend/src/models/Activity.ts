import mongoose, { Document, Schema } from "mongoose";

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: "search" | "view" | "quiz" | "flashcard" | "collection_create" | "concept_save";
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["search", "view", "quiz", "flashcard", "collection_create", "concept_save"],
      required: true,
    },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

activitySchema.index({ user: 1, createdAt: -1 });

export const Activity = mongoose.model<IActivity>("Activity", activitySchema);
