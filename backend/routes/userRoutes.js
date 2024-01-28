import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  getProfilePosts,
  getProfileFollowers,
  getProfileFollowing,
  userFollow,
  userUnfollow,
} from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET Methods */
router.get("/", [authenticate], getAllUsers);
router.get("/posts/:profileId", [authenticate], getProfilePosts);
router.get("/followers/:profileId", [authenticate], getProfileFollowers);
router.get("/following/:profileId", [authenticate], getProfileFollowing);
router.get("/:userId", [authenticate], getUserById);

/* POST Methods */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

/* PUT Methods */
router.put("/follow/:followingId", [authenticate], userFollow);
router.put("/unfollow/:unfollowingId", [authenticate], userUnfollow);

export default router;
