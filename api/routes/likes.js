import express from "express"
import {getAllLikes, getLike, addLike, deleteLike  } from "../controllers/likes.js"

const router = express.Router()

router.get("/", getAllLikes)
router.get("/:id", getLike)
router.post("/", addLike)
router.delete("/:id", deleteLike)

export default router;
