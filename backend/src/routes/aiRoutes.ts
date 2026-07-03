import { Router } from "express";
import { 
  chatStream, 
  explainConcept, 
  generateQuiz,
  compareConcepts,
  explainCode,
  generateFlashcards,
  generateLearningPath
} from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";
import { aiRateLimiter } from "../middleware/aiSecurity.js";

const router = Router();

router.use(protect);
router.use(aiRateLimiter);

router.post("/chat", chatStream);
router.post("/explain", explainConcept);
router.post("/quiz", generateQuiz);
router.post("/compare", compareConcepts);
router.post("/code", explainCode);
router.post("/flashcards", generateFlashcards);
router.post("/learning-path", generateLearningPath);

export default router;
