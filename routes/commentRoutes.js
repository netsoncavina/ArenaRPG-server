import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

// POST
router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET Comments by Post ID
router.get("/post/:id", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET Comment by Author
router.get("/author/:author", async (req, res) => {
  try {
    const comments = await Comment.find({ author: req.params.author });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET Comment by ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
  }
  req.body.edited = true;
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add Like
router.patch("/like/:id", async (req, res) => {
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
  }

  try {
    if (comment.likes.includes(req.body.userId)) {
      comment.likes = comment.likes.filter((id) => id !== req.body.userId);
    } else {
      if (comment.deslikes.includes(req.body.userId))
        comment.deslikes = comment.deslikes.filter(
          (id) => id !== req.body.userId
        );

      comment.likes.push(req.body.userId);
    }
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      comment,
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add Dislike
router.patch("/deslike/:id", async (req, res) => {
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
  }

  try {
    if (comment.deslikes.includes(req.body.userId)) {
      comment.deslikes = comment.deslikes.filter(
        (id) => id !== req.body.userId
      );
    } else {
      if (comment.likes.includes(req.body.userId))
        comment.likes = comment.likes.filter((id) => id !== req.body.userId);
      comment.deslikes.push(req.body.userId);
    }
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      comment,
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
