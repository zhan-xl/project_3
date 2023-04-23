import React, {useEffect, useState} from "react";
import "../style/LogIn.css"
import axios from "axios";
import {useNavigate, useLocation, Link} from "react-router-dom";

const LOGIN_URL = "/logIn";

const LogIn = () => {

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
          LOGIN_URL,
          JSON.stringify({user, pwd}),
          {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
          });
      setUser("");
      setPwd("");
      navigate(from, {replace: true});
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

  return (
      <section className="container">
        <div className="sign-in">Sign in</div>
        <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="label">Username:</label>
          <input
              type="text"
              id="username"
              className="input"
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
          <div>
            <button className="btn">Log In</button>
          </div>
        </form>
        <div><Link to="/sign-up" className="sign-up-letter">No account? Sign up
          here.</Link></div>
      </section>
  )
}

export default LogIn;