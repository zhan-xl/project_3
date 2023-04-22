import React, {useEffect, useState} from "react";
import "../style/NewPost.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import app from '../firebase';
import { v4 as uuid } from 'uuid';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function NewPost() {

  const [postCont, setPostCont] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  async function post() {
    if (image == null) {
    try {
        await axios.post(
    "/post/new-post",
    {postCont},
    {
      headers: {"Content-Type": "application/json"},
      withCredentials: true
    });
  } catch (err) {}
  }
  else {
    // uuid to make each file in images folder have a unique name
    const storage = getStorage(app);
    const imagePath = ref(storage, `/images/${image.name + uuid()}`);
    // uploading
    const uploadTask = uploadBytesResumable(imagePath, image);
    getDownloadURL((await uploadTask).ref).then(async (downloadURL) => {
      try {
            await axios.post(
        "/post/new-post",
        {
          postCont, 
          imagePath: imagePath.fullPath, 
          url: JSON.stringify(downloadURL),
        },
        {
          headers: {"Content-Type": "application/json"},
          withCredentials: true
        });
      } catch (err) {
      }
    });
  }
    navigate(-1); // going back to where I was. Good to learn this -XZ.
  }

  return (
      <div className="container">
        <div className="title">Create new post</div>
        <textarea type="textarea" placeholder="Say something..."
                  cols="32" rows="5"
                  onChange={e => setPostCont(e.target.value)}
                  className="textarea"/>
        <input type="file" onChange={e => setImage(e.target.files[0])}
          accept="image/*" >
        </input> 
        <div className="post-button" onClick={() => {
                  post();
                }}>
          Post
        </div>
      </div>
  )
}