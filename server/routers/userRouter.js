const express = require('express');
const userRouter = express.Router();
const UserModel = require("../schema/User");

//this request returns all users in the database
userRouter.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
})

module.exports = userRouter;