import React, {useEffect, useState} from "react";
import Post from "./post";
import "../style/postContainer.css"
import axios from "axios";

export default function PostContainer(props) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (props.user) {
        const postRes = await axios.get("/post/" + props.user);
        postRes.data.sort((a, b) => {
          return a.postTime < b.postTime ? 1 : -1;
        })
        setPosts(postRes.data);
      } else {
        const postRes = await axios.get("/post");
        postRes.data.sort((a, b) => {
          return a.postTime < b.postTime ? 1 : -1;
        })
        setPosts(postRes.data);
      }
    }
    fetchPosts();
  }, []);

  return (
      <ul className="grid">
        {posts.map((post, index) => (
            <Post
                key={index}
                user={post.postedBy}
                postCont={post.postCont}
                postTime={post.postTime}
                editable={props.editable}
            />))}
      </ul>
  )
}