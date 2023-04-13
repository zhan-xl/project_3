import React, {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../context/AuthProvider";
import "./LogIn.css"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const LOGIN_URL = "/log-in";

export default function LogIn() {

  const {setAuth} = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(LOGIN_URL,
          JSON.stringify({username: user, password: pwd,}),
          {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
          });
      console.log(JSON.stringify(res.data));
      const userId = res.data.userId;
      setAuth({user, pwd, userId})
      setUser("");
      setPwd("");
      await wait(500);
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  }

  function wait(time) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }

  return (<section className="container">
    <div className="sign-in">Sign in</div>
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username" className="label">Username:</label>
      <input
          type="text"
          id="username"
          className="input"
          ref={userRef}
          autoComplete="off"
          onChange={e => setUser(e.target.value)}
          value={user}
          required
      />
      <label htmlFor="password" className="label">Password:</label>
      <input
          type="password"
          id="password"
          className="input"
          onChange={e => setPwd(e.target.value)}
          value={pwd}
          required
      />
      <button className="log-in-button">Log In</button>
    </form>
    <div className="sign-up-letter">No account? Sign up here.</div>
  </section>)
}