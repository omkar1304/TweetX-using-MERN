import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { content } = req.body;

  if (!content) {
    throw new Error("Please write something to post!");
  }

  try {
    const user = await User.findById(userId);
    const post = await Post({
      user: user._id,
      content: content,
    });

    user.posts.push(post._id);

    await post.save();
    await user.save();

    return res.status(201).json(post);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong while creating post!");
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { content } = req.body;
  const { postId } = req.params;

  if (!content) {
    throw new Error("Please write something to update in post!");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found!");
  }

  // equals by mongoose is used to compare ObjectID in mongoDB
  if (!post.user.equals(userId)) {
    throw new Error("Not authorized to update this post!");
  }

  try {
    post.content = content;
    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong while creating post!");
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found!");
  }

  // equals by mongoose is used to compare ObjectID in mongoDB
  if (!post.user.equals(userId)) {
    throw new Error("Not authorized to update this post!");
  }

  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { posts: postId } },
      { new: true }
    );
    await Post.deleteOne({ _id: postId });

    return res.status(201).json({ message: "Post has been deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Something went wrong while deleting post");
  }
});

const getAllUserPosts = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const posts = await Post.find({ user: userId });
    return res.status(200).send(posts);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong while fetching user's posts");
  }
});

const getPostById = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post.user.equals(userId)) {
      return res
        .status(400)
        .send({ error: "Not authorized to view this post" });
    }

    return res.status(200).json(post);
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong while fetching post");
  }
});

const getAllPostsFromFollowing = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const currentUser = await User.findById(userId).select("-password");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userIds = [userId, ...currentUser.following];

    const posts = await Post.find({ user: { $in: userIds } })
      .sort({ updatedAt: -1 })
      .populate("user")

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching posts." });
  }
});

export {
  createPost,
  updatePost,
  deletePost,
  getAllUserPosts,
  getPostById,
  getAllPostsFromFollowing,
};
