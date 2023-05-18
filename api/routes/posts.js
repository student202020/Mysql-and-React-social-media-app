import express from "express"
import {getAllPosts, getAllUserPosts, getPost, addPost, deletePost, updatePost  } from "../controllers/posts.js";

const router = express.Router()

router.get("/", getAllPosts)
router.get("/user/", getAllUserPosts)
router.get("/:id", getPost)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)


export default router;