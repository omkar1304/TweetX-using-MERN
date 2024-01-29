import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getAllUserPosts,
  getPostById,
  getAllPostsFromFollowing
} from "../controllers/postController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET Methods */
router.get("/followingposts", [authenticate], getAllPostsFromFollowing)
router.get("/profile/:profileId", [authenticate], getAllUserPosts);
router.get("/:postId", [authenticate], getPostById);

/* POST Methods */
router.post("/", [authenticate], createPost);

/* PUT Methods */
router.put("/:postId", [authenticate], updatePost);

/* DELETE Methods */
router.delete("/:postId", [authenticate], deletePost);

export default router;
