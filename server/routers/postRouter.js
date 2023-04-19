const PostModel = require("../schema/Post");
const UserModel = require("../schema/User");
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
  
  // if (cookies.jwt){
  //   const foundUser = await UserModel.findOne({refreshToken: cookies.jwt});
    
  //   const post = await PostModel.findById(req.params.postId);
  //   //if the post username matches the req.username (get from jwt)
  //   if (post.postedBy == foundUser.user) {
  //     await post.deleteOne();
  //     res.status(200).send('post has been deleted');
  //   }
  //   else {
  //     res.status(500).send('post not deleted')
  //   }
  // }
})

module.exports = postRouter;