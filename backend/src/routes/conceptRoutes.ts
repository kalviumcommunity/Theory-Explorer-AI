import { Router } from "express";
import { getConcepts, getConcept, getGraph } from "../controllers/conceptController.js";

const router = Router();

router.get("/", getConcepts);
router.get("/graph", getGraph);
router.get("/:slug", getConcept);

export default router;
