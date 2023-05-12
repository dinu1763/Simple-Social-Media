const express = require("express");
const User = require("../models/user.modal");
const Post = require("../models/post.model");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

router.get("/users/top-active", async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user_id",
          as: "posts",
        },
      },
      { $addFields: { totalPosts: { $size: "$posts" } } },
      { $sort: { totalPosts: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

router.get("/posts/top-liked", async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 }).limit(5);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

module.exports = router;
