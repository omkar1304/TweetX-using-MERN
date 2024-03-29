import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("_id name email");
      next();
    } catch (error) {
      console.error(error)
      res.status(401);
      throw new Error("Not authorized! Not a valid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized! No token");
  }
});

export default authenticate;
