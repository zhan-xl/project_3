const express = require('express');
const userRouter = express.Router();
const UserModel = require("../schema/User");
//const mongoose = require('mongoose');
//mongoose.model('users').schema.add({profilePicture: String})

userRouter.get("/", async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    return res.send('') // when logging out, if we send 422 errorcode, we get error in console
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
    res.send('');
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

userRouter.put("/updateProfileDescription/:username", async (req, res) => {
  const cookies = req.cookies;
  if (cookies.jwt) {
    profile_username = req.params.username
    
    const loggedin = await UserModel.findOne({refreshToken: cookies.jwt});
    // this user is the account holder
    if (loggedin.user == profile_username) {
      await UserModel.findOneAndUpdate({user: profile_username}, 
                                       {$set: {perDescr: req.body.postCont
                                      }}, {new: true});
      res.status(200).send('description has been updated');                            
    }
    else {
      res.status(500).send('not allowed');
    }
  }
})

userRouter.put('/pictureUpload/:username', async (req, res) => {
  const cookies = req.cookies;
  if (cookies.jwt) {
    profile_username = req.params.username;
    const loggedin = await UserModel.findOne({refreshToken: cookies.jwt});
    // this user is the account holder
    if (loggedin.user == profile_username) {
      // setting new field with profilePictureURL: picture url received from firebase
      const updated = await UserModel.findOneAndUpdate({user: profile_username}, 
                                       {$set: {profilePictureURL: req.body.url
                                      }}, {returnNewDocument: true,
                                        new: true,
                                        strict: false});
      res.send('profile has been uploaded successfully');                            
    }
    else {
      res.status(500).send('not allowed');
    }
  }
})

userRouter.get('/pictureUpload/:username', async (req, res) => {
  profile_username = req.params.username;
  const user = await UserModel.findOne({user: profile_username});
  res.send(user);
})

module.exports = userRouter;