import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add comments
router.post("/comment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/user/:author", async (req, res) => {
  try {
    const post = await Post.find({ author: req.params.author });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/post/:type", async (req, res) => {
  try {
    const post = await Post.find({ type: req.params.type });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  req.body.edited = true;
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// LIKE
router.patch("/like/:id", async (req, res) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }

  try {
    if (post.likes.includes(req.body.userId)) {
      post.likes = post.likes.filter((id) => id !== req.body.userId);
    } else {
      if (post.deslikes.includes(req.body.userId)) {
        post.deslikes = post.deslikes.filter((id) => id !== req.body.userId);
      }
      post.likes.push(req.body.userId);
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
