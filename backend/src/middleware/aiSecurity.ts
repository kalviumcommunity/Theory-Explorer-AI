import rateLimit from "express-rate-limit";

export const aiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 50 AI requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: "error", message: "Too many AI requests, please try again later" },
});
