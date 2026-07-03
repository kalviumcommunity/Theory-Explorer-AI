import { Router } from "express";
import { getProfile, updateProfile, updatePreferences, getWorkspace } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/preferences", updatePreferences);
router.get("/workspace", getWorkspace);

export default router;
