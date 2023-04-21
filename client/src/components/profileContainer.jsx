import React, { useEffect, useState } from 'react';
import EditDescription from './EditDescription';
import '../style/profileContainer.css';
import '../style/post.css';
import axios from 'axios';
import app from '../firebase';
// image upload code ref from firebase doc (full example):
// https://firebase.google.com/docs/storage/web/upload-files
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ProfileContainer(props) {
  const visitUserName = props.visitUserName;

  const [user, setUser] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false);

  const [image, setImage] = useState(null);

  function editDescription() {
    setOpen(true);
  }

  function uploadImage() {
    const storage = getStorage(app);
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
        } catch (err) {
          // if (err.response.status === 422) {
          //   setNotFound(true);
          // }
        }
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
        src={require('../img/charlie-avatar.png')}
        alt=""
      ></img>

      {/* at 0th index it has the actual file we want */}
      <input type="file" onChange={e => setImage(e.target.files[0])}
      // accepting all image type
        accept="image/*" className='hide-no-file-chosen-msg'></input>
      <button className='profile-picture-btn'>Upload picture</button>
      <br></br>
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
