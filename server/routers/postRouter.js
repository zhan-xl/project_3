const PostModel = require("../schema/Post");
const express = require("express")
const postRouter = express.Router();

postRouter.post("/new-post", async (req, res) => {
  try {
    const dbRes = await PostModel.create(req.body);
    res.send(dbRes);
  } catch (err) {
    res.send(err);
  }
})

postRouter.get("/", async (req, res) => {
  try {
    const dbResponse = await PostModel.find({});
    res.send(dbResponse);
  } catch (err) {
    res.send(err);
  }
})
//
// app.get("/posts/:userId", (req, res) => {
//   PostModel.findPostByUserId(req.params.userId).then(dbResponse => {
//     res.send(dbResponse);
//   })
// })

module.exports = postRouter;