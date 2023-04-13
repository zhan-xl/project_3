const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  content: String,
  postTime: Date,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
}, {collection: "posts"})

const PostModel = mongoose.model("Post", postSchema);

function createPost(post) {
  return PostModel.create(post);
}

function findAllPost() {
  return PostModel.find();
}

function findPostByUserId(userId) {
  return PostModel.find({postedBy: userId});
}

module.exports = {
  createPost,
  findAllPost,
  findPostByUserId
}