const mongoose = require("mongoose");
const UserModel = require("./schema/User");
const PostModel = require("./schema/Post");
const express = require("express");
const app = express();
const logInRouter = require("./routers/logInRouter")
const registerRouter = require("./routers/registerRouter")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SIGN_UP_URL = "/signUp";
const LOG_IN_URL = "logIn";

app.use(LOG_IN_URL, logInRouter);
app.use(SIGN_UP_URL, registerRouter);

const mongoUri = "mongodb+srv://zhanxl:xafzu9-decvov-fibNyd@xiaolinwebdev.sq1refr.mongodb.net/project3?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  autoIndex: true, //make this also true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.listen(8000, function() {
  console.log("Server started on port 8000")
})

app.post("/new-post", (req, res) => {
  PostModel.createPost(req.body).then(dbResponse => {
    res.send(dbResponse.postBy);
  }).catch(error => {
    res.send(error);
  })
})

app.get("/posts", (req, res) => {
  PostModel.findAllPost({}).then(dbResponse => {
    res.send(dbResponse);
  })
})

app.get("/posts/:userId", (req, res) => {
  PostModel.findPostByUserId(req.params.userId).then(dbResponse => {
    res.send(dbResponse);
  })
})

app.get("/:userId", (req, res) => {
  UserModel.findById(req.params.userId).then (dbResponse => {
    res.send(dbResponse);
  })
})