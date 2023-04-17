const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  postCont: String,
  postTime: Date,
  postedBy: String,
}, {collection: "posts"})

module.exports = mongoose.model("Post", postSchema);
