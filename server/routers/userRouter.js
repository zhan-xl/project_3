const express = require('express');
const userRouter = express.Router();
const UserModel = require("../schema/User");

userRouter.get("/", async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    return res.sendStatus(422); //user in not in the system
  }
  const foundUser = await UserModel.findOne({refreshToken: cookie.jwt});
  res.send({user: foundUser.user, joinTime: foundUser.joinTime, perDescr: foundUser.perDescr});
})

userRouter.get("/findByName/:userName", async (req, res) => {
  const userName = req.params.userName;
  const foundUser = await UserModel.findOne({user: userName});
  if (foundUser) {
    res.send({user: foundUser.user, joinTime: foundUser.joinTime, perDescr: foundUser.perDescr});
  } else {
    res.sendStatus(422); // user is not in the database
  }

})

userRouter.get("/all", async (req, res) => {
  const foundUsers = await UserModel.find();
  let resUsers = [];
  for (let user of foundUsers) {
    resUsers = [...resUsers, {user: user.user, joinTime: user.joinTime, perDescr: user.perDescr}];
  }
  res.send(resUsers);
})

userRouter.get("/search/:string", async (req, res) => {
  const string = req.params.string.toLowerCase();
  const allUsers = await UserModel.find();
  let foundUsers = [];
  for (let user of allUsers) {
    const username = user.user.toLowerCase();
    if (username.includes(string)) {
      foundUsers.push(user.user);
    }
  }
  res.send(foundUsers);
})

module.exports = userRouter;