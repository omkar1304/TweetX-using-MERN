import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  userFollow,
  userUnfollow,
} from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET Methods */
router.get("/", [authenticate], getAllUsers);
router.get("/:userId", [authenticate], getUserById);

/* POST Methods */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

/* PUT Methods */
router.put("/follow/:followingId", [authenticate], userFollow);
router.put("/unfollow/:unfollowingId", [authenticate], userUnfollow);

export default router;
