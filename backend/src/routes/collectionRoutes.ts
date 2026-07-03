import { Router } from "express";
import { 
  getCollections, 
  createCollection, 
  updateCollection, 
  deleteCollection, 
  addConceptToCollection, 
  removeConceptFromCollection 
} from "../controllers/collectionController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);

router.route("/")
  .get(getCollections)
  .post(createCollection);

router.route("/:id")
  .put(updateCollection)
  .delete(deleteCollection);

router.route("/:id/concepts")
  .post(addConceptToCollection);

router.route("/:id/concepts/:conceptId")
  .delete(removeConceptFromCollection);

export default router;
