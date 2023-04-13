const express = require('express');
const registerRouter = express.Router();
const UserModel = require("../schema/User");
const bcrypt = require("bcrypt");

registerRouter.post("/", async (req, res) => {
  const {user, pwd, des} = req.body;
  if (!user || !pwd) {
    return res.status(400).json(
        {"message": "Username and password are required"});
  }
  try {
    const joinDate = new Date();
    bcrypt.hash(pwd.toString(), 10, async function (err, hash) {
      const newUser = {user, pwd: hash, des, joinDate};
      console.log(newUser)
      const dbResponse = await UserModel.create(newUser);
      res.send(JSON.stringify(dbResponse));
    });


  } catch
      (error) {
    if (error?.code === 11000) {
      res.status(409).json({"message": "Username is already exist."});
    }
  }
})

async function hashPassword(pwd) {
  const hashedPassword = await bcrypt.hash(pwd, 10);
  console.log(hashedPassword);
  return hashedPassword;
}

module.exports = registerRouter;