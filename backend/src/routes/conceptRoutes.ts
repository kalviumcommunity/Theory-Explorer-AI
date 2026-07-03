import { Router } from "express";
import { getConcepts, getConcept } from "../controllers/conceptController.js";

const router = Router();

router.get("/", getConcepts);
router.get("/:slug", getConcept);

export default router;
