import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  likes: {
    type: [String],
    default: [],
  },
  deslikes: {
    type: [String],
    default: [],
  },
  edited: {
    type: Boolean,
    default: false,
  },
  answers: {
    type: [Object],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
