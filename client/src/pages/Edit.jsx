import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../style/NewPost.css"
import axios from "axios";

export default function Edit() {
    const [postContent, setPostContent] = useState("");

    const location = useLocation();
    const {id} = location.state;
    const navigate = useNavigate();

    //updating a post by its postid
    async function postUpdate() {
        if (id) {
            await axios.put('/post/' + id, JSON.stringify({
                postContent,
              }),
              {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
              });
              navigate(-1);
        }
    }

    return (
        <>
        <div className="container">
            <div className="title">Edit post</div>
                <textarea type="textarea" placeholder="Say something..."
                    cols="32" rows="5"
                  onChange={e => setPostContent(e.target.value)}
                  className="textarea"/>
            <div className="post-button" onClick={postUpdate}>Update</div>
      </div>
        </>
    )
}