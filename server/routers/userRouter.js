const express = require('express');
const userRouter = express.Router();
const UserModel = require("../schema/User");

//this request returns all users in the database
userRouter.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
})

userRouter.get("/user", async (req, res) => {
  const cookie = req.cookies;
  // res.send(cookie.jwt);
  if (!cookie.jwt) {
    return res.send("");
  }
  const user = await UserModel.findOne({refreshToken: cookie.jwt})
  res.send(user.user); // this is username
})

module.exports = userRouter;