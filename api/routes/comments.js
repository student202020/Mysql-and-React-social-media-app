
import express from "express"
import {getAllComments, getComment, addComment, deleteComment } from "../controllers/comments.js"

const router = express.Router()

router.get("/", getAllComments)
router.get("/:id", getComment)
router.post("/", addComment)
router.delete("/:id", deleteComment)

export default router;
