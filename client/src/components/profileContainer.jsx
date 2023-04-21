import React, { useEffect, useState } from 'react';
import EditDescription from './EditDescription';
import '../style/profileContainer.css';
import '../style/post.css';
import axios from 'axios';
import app from '../firebase';
import { v4 as uuid } from 'uuid';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ProfileContainer(props) {
  const visitUserName = props.visitUserName;

  const [user, setUser] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgURL, setImgURL] = useState(null);

  const [image, setImage] = useState(null);

  function editDescription() {
    setOpen(true);
  }

  async function uploadImage() {
    const storage = getStorage(app);
    if (image == null) {
      return;
    }
    // uuid to make each file in images folder have a unique name
    const imagePath = ref(storage, `/images/${image.name + uuid()}`);
    // uploading
    const uploadTask = uploadBytesResumable(imagePath, image);
   
    // Upload completed successfully, now we can get the download URL
    getDownloadURL((await uploadTask).ref).then((downloadURL) => {
      // make api call find the logged in user, post the url in mongodb
      // get the url from mongodb for the user
      // setImgURL();  set it to the retunred url so it stays there.
    });
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (visitUserName) {
        try {
          const userResponse = await axios.get(
            '/user/findByName/' + visitUserName
          );
          if (userResponse.data.user === undefined) {
            setNotFound(true);
          }
          setUser(userResponse.data);
        } catch (err) {}
      }
    };
    fetchUser().then();
  }, [visitUserName]);

  return notFound ? (
    <div>User does not exist</div>
  ) : (
    <div className="profile-container">
      <img
        className="profile-avatar"
        src= {imgURL}
        alt=""
      ></img>
       {props.editable ? 
      <>
        <input type="file" onChange={e => setImage(e.target.files[0])}
          accept="image/*" >
        </input> 
      <button className='profile-picture-btn' onClick={uploadImage}>Upload image</button>
       </>
      : ''}
      <div className="profile-username">{user.user}</div>
      <div className="profile-join-time">
        Joined on: {new Date(user.joinTime).toLocaleString().split(',')[0]}
      </div>
      <div className="description">
        {user.perDescr}
        {props.editable ?
        <button className="edit-icon" onClick={editDescription}>
          Edit
        </button> : ''}
      </div>

      {open && <EditDescription setOpen={setOpen} username={visitUserName} />}
    </div>
  );
}
