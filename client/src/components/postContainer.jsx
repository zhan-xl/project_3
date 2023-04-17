import React, {useEffect, useState} from "react";
import Post from "./post";
import "../style/postContainer.css"
import axios from "axios";

export default function PostContainer(props) {

  return (
      <ul className="grid">
        {props.posts.map((post, index) => (
            <Post
                key={index}
                user={post.postedBy}
                postCont={post.postCont}
                postTime={new Date().toLocaleString()}
            />))}
      </ul>
  )
}