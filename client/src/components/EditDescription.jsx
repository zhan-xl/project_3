import React, { useState } from "react";
import "../style/NewPost.css"
import axios from 'axios';

export default function EditDescription(props) {
  // this page is shown when user clicks edit button and when user clicks update btn, closes.
    const setOpen = props.setOpen;
    const username = props.username;
    const [postCont, setPostCont] = useState("");

    // update the user's profile description by finding the username
    async function handleUpdate() {
      setOpen(false);
      
      if (username) {
        await axios.put('/user/updateProfileDescription/' + username, JSON.stringify({
          postCont,
          }),
          {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
          });
          window.location.reload()
    }
    }

    return (
       <div>
       <textarea type="textarea" placeholder="Say something..."
                  cols="32" rows="5"
                  onChange={e => setPostCont(e.target.value)}
                  className="textarea"/>
        <button className="post-button" onClick={handleUpdate}>
          Update
        </button>
       </div>
    )
}