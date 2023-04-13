const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {type: String, unique: true, required: true},
  pwd: {type: String, required: true},
  joinDate: Date,
  des: String,
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"posts",
  },
}, {collection: "users"})

module.exports = mongoose.model("User", userSchema);