import React, { useEffect, useState } from "react";
import "../style/post.css"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Post(props) {
  const navigate = useNavigate();
  const [loggedInUser, setUser] = useState('');

  async function updatePost() {
    navigate('/edit');
  }

  async function deletePost() {
    // delete post by postid ---- need to change this hardcoded post id 
    const response = await axios.delete('/post/643dd086c7d0c1aa6b333855')
    console.log(response.data);
  }

  async function isLoggedin() {
    const response = await axios.get('/user');
    setUser(response.data)
  }

  useEffect(() => {
    isLoggedin()
  }, [])

  return (
      <div className="grid-container">
        <div className="post-avatar-div">
          <img className="post-avatar"
               src={require("../img/charlie-avatar.png")} alt=""/>
        </div>
        <div>
          <Link to={"/profile"}
                state={{userName: props.user}}
                className="username">{props.user}
          </Link>
          <span className="date-and-time">{new Date(
              props.postTime).toLocaleString()}</span>
          {loggedInUser!== '' ?
            <>
              <span className="update-btn" onClick={updatePost}>Edit</span>
              <span className="delete-btn" onClick={deletePost}>Delete</span>
            </>
          : ''}
        </div>

        <div className="content">{props.postCont}</div>
      </div>
  )
}