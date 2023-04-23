const PostModel = require("../schema/Post");
const UserModel = require("../schema/User");
const express = require("express")
const verifyJWT = require("../middleware/verifyJWT");
const postRouter = express.Router();
const mongoose = require("mongoose");

postRouter.post("/new-post", async (req, res) => {
  try {
    const postCont = req.body.postCont;
    const imagePath = req.body.imagePath;
    const downloadURL = req.body.url;
    const postTime = new Date();
    await verifyJWT(req, res, async (foundUser) => {
      const dbRes = await PostModel.create({postCont, postTime, postedBy: foundUser.user, imagePath, downloadURL});
      res.send(dbRes);
    });
  } catch (err) {
    res.send(err);
  }
})

//getting all posts
postRouter.get("/", async (req, res) => {
  try {
    const dbResponse = await PostModel.find({});
    res.send(dbResponse);
  } catch (err) {
    res.send(err);
  }
})

postRouter.get("/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const dbResponse = await PostModel.find({postedBy: userName});
    res.send(dbResponse);
  } catch (err) {
    res.send(err);
  }
})

postRouter.delete('/:postId', async function (req, res) {
  const cookies = req.cookies;
  
  if (cookies.jwt){
    const foundUser = await UserModel.findOne({refreshToken: cookies.jwt});
    
    const post = await PostModel.findById(req.params.postId);
    //if the post username matches the req.username (get from jwt)
    if (post.postedBy == foundUser.user) {
      await post.deleteOne();
      res.status(200).send('post has been deleted');
    }
    else {
      res.status(500).send('post not deleted')
    }
  }
})

postRouter.put('/:postId', async function (req, res) {
  const cookies = req.cookies;
  const imagePath = req.body.imagePath;
  const downloadURL = req.body.url;
  if (cookies.jwt){
    const foundUser = await UserModel.findOne({refreshToken: cookies.jwt});
    const post = await PostModel.findById(req.params.postId);
    //if the post username matches the req.username (get from jwt)
    if (post.postedBy == foundUser.user) {
      await PostModel.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.params.postId)}, 
                                       {$set: {postCont: req.body.postContent,
                                        imagePath: imagePath, downloadURL: downloadURL,
                                      postTime: new Date()}}, {new: true});
      res.status(200).send('post has been updated');
    }
    else {
      res.status(500).send('post update failed');
     }
  }
})

module.exports = postRouter;