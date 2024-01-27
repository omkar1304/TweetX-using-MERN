import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import createToken from "../utils/createToken.js";
import asyncHandler from "../middleware/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("All fields are required!");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User({
    name,
    email,
    password: hashPassword,
  });

  try {
    await user.save();
    createToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("All fields are required!");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isValidPassword) {
      createToken(res, existingUser._id);
      return res.status(201).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      });
    } else {
      return res.status(400).json({ message: "Password doesn't match" });
    }
  }

  return res.status(400).json({ message: "Email doesn't exist" });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong while fetching users!");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select("-password");

  if (user) {
    return res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User doesn't exist");
  }
});

const userFollow = asyncHandler(async (req, res) => {
  const { followingId } = req.params;
  console.log(followingId);
  const { _id: userId } = req.user;

  const followingUser = await User.findById(followingId);
  if (!followingId) {
    throw new Error("Following account not found!");
  }

  const user = await User.findById(userId);

  // Check if the user is already following the target user
  if (user.following.includes(followingId)) {
    return res
      .status(400)
      .json({ message: "You are already following this account." });
  }

  try {
    user.following.push(followingId);
    await user.save();

    followingUser.followers.push(userId);
    await followingUser.save();

    return res
      .status(201)
      .json({ message: `you started following ${followingUser.name}` });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong while following accoount!");
  }
});

const userUnfollow = asyncHandler(async (req, res) => {
  const { unfollowingId } = req.params;
  const { _id: userId } = req.user;

  const unfollowingUser = await User.findById(unfollowingId);
  if (!unfollowingId) {
    throw new Error("Unfollowing account not found!");
  }

  const user = await User.findById(userId);

  if (!user.following.includes(unfollowingId)) {
    return res
      .status(400)
      .json({ message: "You haven't followed this account yet!" });
  }

  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { following: unfollowingId } },
      { new: true }
    );

    await User.findOneAndUpdate(
      { _id: unfollowingId },
      { $pull: { followers: userId } },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: `you started unfollowing ${unfollowingUser.name}` });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong while unfollowing accoount!");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  userFollow,
  userUnfollow,
};
