const express = require('express');
const signUpRouter = express.Router();
const UserModel = require("../schema/User");
const bcrypt = require("bcrypt");

signUpRouter.post("/", async (req, res) => {
  const {user, pwd, perDescr} = req.body;
  const joinTime = new Date();
  const refreshToken = "";
  try {
    const hash = await bcrypt.hash(pwd.toString(), 10);
    const newUser = {user, pwd: hash, joinTime, perDescr, refreshToken, profilePictureURL};
    await UserModel.create(newUser);
    res.send(true);
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = signUpRouter;

