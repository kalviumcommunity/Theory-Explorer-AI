import mongoose, { Document, Schema } from "mongoose";

export interface IBookmark extends Document {
  user: mongoose.Types.ObjectId;
  concept: mongoose.Types.ObjectId;
  folder?: string;
  notes?: string;
  createdAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    concept: { type: Schema.Types.ObjectId, ref: "Concept", required: true },
    folder: { type: String, trim: true },
    notes: { type: String },
  },
  { timestamps: true }
);

bookmarkSchema.index({ user: 1, concept: 1 }, { unique: true });

export const Bookmark = mongoose.model<IBookmark>("Bookmark", bookmarkSchema);
