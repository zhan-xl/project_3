import React, {useContext, useState} from "react";
import "../style/NewPost.css"
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

export default function NewPost() {

  const {auth} = useContext(AuthContext);

  const [postCont, setPostCont] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  async function post() {
    await axios.post(
        "post/new-post",
        JSON.stringify({
          postCont,
          postTime: new Date(),
          postedBy: auth.user,
        }),
        {
          headers: {"Content-Type": "application/json"},
          withCredentials: true
        });
    navigate(from, {replace: true});
  }

  return (
      <div className="container">
        <div className="title">Create new post</div>
        <textarea type="textarea" placeholder="Say something..."
                  cols="32" rows="5"
                  onChange={e => setPostCont(e.target.value)}
                  className="textarea"/>
        <div className="post-button" onClick={post}>
          Post
        </div>
      </div>
  )
}