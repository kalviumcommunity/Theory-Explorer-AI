import { Router } from "express";
import { getHistory, getProgress, trackView } from "../controllers/progressController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);

router.get("/history", getHistory);
router.get("/stats", getProgress);
router.post("/track", trackView);

export default router;
