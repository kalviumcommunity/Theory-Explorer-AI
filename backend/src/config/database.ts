import mongoose from "mongoose";
import { env } from "./env.js";

let mongod: unknown = null;

export async function connectDatabase(): Promise<void> {
  const uri = env.mongodbUri;

  if (uri.includes("127.0.0.1") || uri.includes("localhost")) {
    try {
      await mongoose.connect(uri);
      console.log(`[DB] Connected to MongoDB at ${uri}`);
      return;
    } catch {
      console.warn("[DB] MongoDB not available at", uri);
      console.warn("[DB] Starting embedded MongoDB for development...");

      const { MongoMemoryServer } = await import("mongodb-memory-server");
      mongod = await MongoMemoryServer.create();
      const memUri = (mongod as InstanceType<typeof MongoMemoryServer>).getUri();
      await mongoose.connect(memUri);
      console.log(`[DB] Connected to in-memory MongoDB at ${memUri}`);
      return;
    }
  }

  await mongoose.connect(uri);
  console.log(`[DB] Connected to MongoDB at ${uri}`);
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  if (mongod) {
    await (mongod as { stop(): Promise<void> }).stop();
  }
}
