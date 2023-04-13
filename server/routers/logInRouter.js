const express = require('express');
const logInRouter = express.Router();
const UserModel = require("../schema/User");

logInRouter.post("/", (req, res) => {
  const {user, pwd, des} = req.body;
  if (!user || !pwd ) return res.status(400).json({"message": "Username and password are required"});
  const joinDate = new Date();
  const newUser = {user, pwd, des, joinDate};
  UserModel.findOne(req.body)
  .then((dbResponse) => {
    res.send(JSON.stringify(dbResponse));
  })
  .catch((error) => {
    res.status(500).send(error);
  })
})

module.exports = logInRouter;