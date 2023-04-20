import React, {useEffect, useState} from "react";
import Post from "./post";
import "../style/postContainer.css"
import axios from "axios";

export default function PostContainer(props) {

  const {user, editable} = props;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const postRes = await axios.get("/post/" + user);
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
  }, [user]);

  return (
      <ul className="grid">
        {posts.map((post, index) => (
            <Post
                key={index}
                user={post.postedBy}
                postCont={post.postCont}
                postTime={post.postTime}
                editable={editable}
                post_id={post._id}
            />))}
      </ul>
  )
}