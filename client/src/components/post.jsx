import React from "react";
import "../style/post.css"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Post(props) {
  const navigate = useNavigate();

  async function updatePost() {
    navigate('/edit', {replace: true, state: {id: props.post_id}});
  }

  async function deletePost() {
    // delete post by postid ---- need to change this hardcoded post id
    if (props.post_id) { // if statement is needed or gets 500 error
      await axios.delete('/post/' + props.post_id);
      window.location.reload();
    }
  }

  return (
      <div className="grid-container">
        <div className="post-avatar-div">
          <img className="post-avatar"
               src={require("../img/charlie-avatar.png")} alt=""/>
        </div>
        <div>
          <Link to={"/profile"}
                onClick={() => window.location.reload()}
                state={{userName: props.user}}
                className="username">
            {props.user}
          </Link>
          <span className="date-and-time">{new Date(
              props.postTime).toLocaleString()}
          </span>
          {props.editable ?
            <>
              <button className="delete-btn" onClick={deletePost}>Delete</button>
              <button className="update-btn" onClick={updatePost}>Edit</button>
            </>
          : ''}
        </div>
        <div className="content">{props.postCont}</div>
      </div>
  )
}