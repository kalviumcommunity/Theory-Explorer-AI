import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  explanationLevel: "beginner" | "intermediate" | "advanced";
  emailNotifications: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  username?: string;
  bio?: string;
  interests: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  googleId?: string;
  preferences: IUserPreferences;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const preferencesSchema = new Schema<IUserPreferences>(
  {
    theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
    language: { type: String, default: "en" },
    explanationLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    emailNotifications: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, minlength: 8, select: false },
    avatar: { type: String },
    username: { type: String, unique: true, sparse: true, trim: true, lowercase: true },
    bio: { type: String, maxlength: 500 },
    interests: [{ type: String }],
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    googleId: { type: String, unique: true, sparse: true },
    preferences: { type: preferencesSchema, default: () => ({}) },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
