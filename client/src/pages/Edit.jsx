import React, {useState } from "react";
import "../style/NewPost.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Edit() {
    const [postContent, setPostContent] = useState("");
    const navigate = useNavigate();

    //updating a post by its postid
    async function postUpdate() {
        const response = await axios.put('/post/') // + postid
        
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