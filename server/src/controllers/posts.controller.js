const express = require("express");
const Post = require("../models/post.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

router.get("", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "user_id", select: "name" })
      .lean()
      .exec();
    return res.send(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean().exec();

    return res.send(post);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.send(post);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(post);
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

router.post("/:id/like", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/:id/unlike", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes === 0) {
      return res
        .status(400)
        .json({ message: "Cannot unlike a post with 0 likes" });
    }
    post.likes--;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
