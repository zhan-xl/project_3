import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../style/NewPost.css"
import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import app from '../firebase';

export default function Edit() {
    const [postContent, setPostContent] = useState("");

    const location = useLocation();
    const {id, path} = location.state;
    const navigate = useNavigate();
    const [img, setImage] = useState(null);

    //updating a post by its postid
    async function postUpdate() {
        if (id) {
            const storage = getStorage(app);
            const imagePath = ref(storage, path); // getting the img path to update new img
            const uploadTask = uploadBytesResumable(imagePath, img);
            getDownloadURL((await uploadTask).ref).then(async (downloadURL) => {
                await axios.put('/post/' + id, JSON.stringify({
                    postContent, imagePath: imagePath.fullPath, 
                    url: downloadURL,
                  }),
                  {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                  }).then(navigate('/'));
            })
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
                <input type="file" onChange={e => setImage(e.target.files[0])}
                accept="image/*" >
                </input> 
            <div className="post-button" onClick={postUpdate}>Update</div>
      </div>
        </>
    )
}