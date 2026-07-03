import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Activity } from "../models/Activity.js";
import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";

function signToken(id: string, expiresIn: string = env.jwt.expiresIn as string): string {
  return jwt.sign({ id }, env.jwt.secret, { expiresIn } as jwt.SignOptions);
}

export class AuthService {
  static async register(data: any) {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("Email already registered", 409);
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user.id);

    await Activity.create({
      user: user.id,
      type: "view",
      metadata: { action: "account_created" },
    });

    return { user, token };
  }

  static async login(data: any) {
    const { email, password, rememberMe } = data;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!user.isActive) {
      throw new AppError("Account is deactivated", 403);
    }

    user.lastLogin = new Date();
    await user.save();

    const token = signToken(user.id, rememberMe ? "30d" : (env.jwt.expiresIn as string));

    await Activity.create({
      user: user.id,
      type: "view",
      metadata: { action: "login" },
    });

    return { user, token };
  }

  static async getMe(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  static async googleAuth(googleToken: string) {
    if (!googleToken) {
      throw new AppError("Google token is required", 400);
    }

    const email = googleToken.includes("@") ? googleToken : `${googleToken}@gmail.com`;
    const name = email.split("@")[0] || "Google User";

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: `google-${Date.now()}`,
        password: `random-password-${Date.now()}`,
      });

      await Activity.create({
        user: user.id,
        type: "view",
        metadata: { action: "account_created_google" },
      });
    } else {
      if (!user.googleId) {
        user.googleId = `google-${Date.now()}`;
      }
      user.lastLogin = new Date();
      await user.save();

      await Activity.create({
        user: user.id,
        type: "view",
        metadata: { action: "login_google" },
      });
    }

    const token = signToken(user.id, "30d");

    return { user, token };
  }
}
