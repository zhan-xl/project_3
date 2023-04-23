import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "../style/SignUp.css"

const SIGN_UP_URL = "/signUp";

const SignUp = () => {

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [perDescr, setPerDescr] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, perDescr]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
          SIGN_UP_URL,
          JSON.stringify({user, pwd, perDescr}),
          {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
          })
      setSuccess(true);
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username is Already Exist");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  }

  return (
      <div className="container">
            <div>
              <div className="sign-up">Sign up</div>
              <p className={errMsg ? "err-msg" : "offscreen"}>{errMsg}</p>
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
                <label htmlFor="perDescr" className="label">Personal
                  Description:</label>
                <textarea
                    id="perDescr"
                    className="text-area"
                    onChange={e => setPerDescr(e.target.value)}
                    value={perDescr}
                    required
                />
                <div>
                  <button className="btn"
                          disabled={!user || !pwd || !perDescr}>Submit
                  </button>
                </div>
              </form>
              <div className="register-prompt">
                Already registered? <Link to='/log-in' className="line">Sign in here</Link>
              </div>
            </div>
      </div>
  )
}

export default SignUp;