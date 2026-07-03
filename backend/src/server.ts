import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";

async function start(): Promise<void> {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`[Server] Concept Atlas API running on port ${env.port}`);
    console.log(`[Server] Environment: ${env.nodeEnv}`);
  });
}

start().catch((err) => {
  console.error("[Server] Failed to start:", err);
  process.exit(1);
});
