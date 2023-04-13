import React, {useEffect, useRef, useState} from "react";
import "./NewPost.css"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function NewPost() {

  const [userLogIn, setUserLogin] = useState({logIn: false, userId: ""});
  const postContentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("userLogIn") && setUserLogin(
        JSON.parse(localStorage.getItem("userLogIn")));
  }, [])

  async function post() {
    const postContent = postContentRef.current.value;
    const res = await axios.post("/new-post", {
      content: postContent,
      postTime: new Date(),
      postedBy: userLogIn.userId,
    })
    navigate("/")
  }


  return (
      <div className="container">
        <div className="title">Create new post</div>
        <textarea type="textarea" placeholder="Say something..."
                  cols="32" rows="5"
                  ref={postContentRef}
                  className="textarea"/>
        <div className="post-button" onClick={post}>
          Post
        </div>
      </div>
  )
}