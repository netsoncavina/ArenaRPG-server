import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
    default: function () {
      return Math.floor(Math.random() * 20);
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.login = function (id, callback) {
  return this.findByIdAndUpdate(
    id,
    { $set: { lastLogin: Date.now() } },
    { new: true },
    callback
  );
};

const User = mongoose.model("User", userSchema);

export default User;
