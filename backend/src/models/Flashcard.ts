import mongoose, { Document, Schema } from "mongoose";

export interface IFlashcard extends Document {
  concept: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  front: string;
  back: string;
  easeFactor: number;
  interval: number; // in days
  nextReviewDate: Date;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const flashcardSchema = new Schema<IFlashcard>(
  {
    concept: { type: Schema.Types.ObjectId, ref: "Concept", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    front: { type: String, required: true },
    back: { type: String, required: true },
    easeFactor: { type: Number, default: 2.5 },
    interval: { type: Number, default: 0 },
    nextReviewDate: { type: Date, default: Date.now },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

flashcardSchema.index({ user: 1, concept: 1 });
flashcardSchema.index({ user: 1, nextReviewDate: 1 });

export const Flashcard = mongoose.model<IFlashcard>("Flashcard", flashcardSchema);
