const express = require('express');
const logOutRouter = express.Router();
const UserModel = require("../schema/User");

logOutRouter.put("/", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  const refreshToken = cookies.jwt;
  const foundUser = await UserModel.findOne({refreshToken});
  if (!foundUser) {
    res.clearCookie("jwt", {httpOnly: true, sameSite: "None", secure: true});
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  await foundUser.save();
  res.clearCookie("jwt", {httpOnly: true, sameSite: "None", secure: true});
  return res.sendStatus(204);
})

module.exports = logOutRouter;