import React, {useEffect, useState} from "react";
import Post from "./post";
import "./postContainer.css"
import axios from "axios";

export default function PostContainer(props) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (props.userId) {
      axios.get("/posts/" + props.userId).then((res) => {
        setPosts(res.data);
      });
    } else {
      axios.get("/posts").then((res) => {
        setPosts(res.data);
      });
    }

  }, []);

  return (
      <ul className="grid">
        {posts.map(post => (<Post
            key={post._id}
            userId={post.postedBy}
            content={post.content}
            postTime={new Date(post.postTime).toLocaleString()}
        />))}
      </ul>
  )
}