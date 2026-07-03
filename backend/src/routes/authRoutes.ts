import { Router } from "express";
import { register, login, getMe, logout, googleAuth } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema, googleAuthSchema } from "../validators/authValidator.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.post("/google", validate(googleAuthSchema), googleAuth);
router.get("/me", protect, getMe);

export default router;
