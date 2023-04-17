import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthProvider";
import "../style/LogIn.css"
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

const LOGIN_URL = "/logIn";

const LogIn = () => {

  const {setAuth} = useContext(AuthContext);

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
      const logInResponse = await axios.post(
          LOGIN_URL,
          JSON.stringify({user}),
          {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
          });
      const userId = logInResponse.data.userId;
      const accessToken = logInResponse.data?.accessToken;
      setAuth({user, pwd, userId, accessToken})
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
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
      <button className="log-in-button">Log In</button>
    </form>
    <div className="sign-up-letter">No account? Sign up here.</div>
  </section>)
}

export default LogIn;