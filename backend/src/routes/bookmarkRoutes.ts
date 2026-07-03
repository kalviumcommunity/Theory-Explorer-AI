import { Router } from "express";
import { getBookmarks, addBookmark, removeBookmark } from "../controllers/bookmarkController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);

router.route("/")
  .get(getBookmarks)
  .post(addBookmark);

router.route("/:id")
  .delete(removeBookmark);

export default router;
