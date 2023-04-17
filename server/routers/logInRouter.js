const express = require('express');
const logInRouter = express.Router();
const UserModel = require("../schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

logInRouter.post("/", async (req, res) => {
  const {user, pwd} = req.body;
  const foundUser = await UserModel.findOne({user});
  if (!foundUser) {
    return res.status(401);
  }
  const match = await bcrypt.compare(pwd.toString(), foundUser.pwd);
  if (match) {
    const refreshToken = jwt.sign(
        {"username": foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    );
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.send(foundUser.id);
  } else {
    res.status(401);
  }
})

module.exports = logInRouter;