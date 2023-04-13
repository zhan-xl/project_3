import React, {useContext, useEffect, useRef} from "react";
import axios from "axios";
import {UserLogIn} from "../App";
import {Link, useNavigate} from "react-router-dom";

export default function SignUp () {

  const usernameRef = useRef();
  const passwordRef = useRef();
  const personalDescriptionRef = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    localStorage.clear();
  }, [])

  function wait (time) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  async function onSignUp () {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const personalDescription = personalDescriptionRef.current.value;
    const res = await axios.post("/sign-up", {
      username: username,
      password: password,
      joinTime: new Date(),
      personalDescription: personalDescription,
    })
    localStorage.setItem("userLogIn", JSON.stringify({logIn: true, userId: res.data}));
    await wait(500);
    navigate("/");
  }

  return (
      <div className="container">
        <div className="sign-in">Sign up</div>
        <input type="text" placeholder="username" ref={usernameRef} className="input"/>
        <input type="password" placeholder="password" ref={passwordRef} className="input"/>
        <input type="text" placeholder="Write something about yourself" ref={personalDescriptionRef} className="input"/>
        <div className="log-in-button" onClick={onSignUp}>
          Submit
        </div>
      </div>
  )
}