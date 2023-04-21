import React, { useEffect, useState } from 'react';
import EditDescription from './EditDescription';
import '../style/profileContainer.css';
import '../style/post.css';
import axios from 'axios';

export default function ProfileContainer(props) {
  const visitUserName = props.visitUserName;

  const [user, setUser] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false);

  function editDescription() {
    setOpen(true);
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
