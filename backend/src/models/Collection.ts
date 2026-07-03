import mongoose, { Document, Schema } from "mongoose";

export interface ICollection extends Document {
  name: string;
  description?: string;
  user: mongoose.Types.ObjectId;
  concepts: mongoose.Types.ObjectId[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const collectionSchema = new Schema<ICollection>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    concepts: [{ type: Schema.Types.ObjectId, ref: "Concept" }],
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

collectionSchema.index({ user: 1 });

export const Collection = mongoose.model<ICollection>("Collection", collectionSchema);
