import { Router } from "express";
import { search } from "../controllers/searchController.js";

const router = Router();

router.get("/", search);
router.post("/", search);

export default router;
