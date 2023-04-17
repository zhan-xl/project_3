const mongoose = require("mongoose");
const UserModel = require("./schema/User");
const PostModel = require("./schema/Post");
const express = require("express");
const app = express();
const logInRouter = require("./routers/logInRouter");
const signUpRouter = require("./routers/signUpRouter");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");

const SIGN_UP_URL = "/signUp";
const LOG_IN_URL = "/logIn";
const USER_URL = "/user"
const POST_URL = "/post";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(LOG_IN_URL, logInRouter);
app.use(SIGN_UP_URL, signUpRouter);
app.use(USER_URL, userRouter);
app.use(POST_URL, postRouter);

const mongoUri = "mongodb+srv://zhanxl:xafzu9-decvov-fibNyd@xiaolinwebdev.sq1refr.mongodb.net/project3?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  autoIndex: true, //make this also true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.listen(8000, function() {
  console.log("Server started on port 8000")
})