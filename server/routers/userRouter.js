const express = require('express');
const userRouter = express.Router();
const UserModel = require("../schema/User");

userRouter.get("/", async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    return res.send("");
  }
  const foundUser = await UserModel.findOne({refreshToken: cookie.jwt});
  res.send({user: foundUser.user, joinTime: foundUser.joinTime, perDescr: foundUser.perDescr});
})

userRouter.get("/findByName/:userName", async (req, res) => {
  const userName = req.params.userName;
  const foundUser = await UserModel.findOne({user: userName});
  res.send({user: foundUser.user, joinTime: foundUser.joinTime, perDescr: foundUser.perDescr});
})

userRouter.get("/all", async (req, res) => {
  const foundUsers = await UserModel.find();
  let resUsers = [];
  for (let user of foundUsers) {
    resUsers = [...resUsers, {user: user.user, joinTime: user.joinTime, perDescr: user.perDescr}];
  }
  res.send(resUsers);
})

module.exports = userRouter;