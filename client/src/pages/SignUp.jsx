import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
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
      <section className="container">
        {success ? (
            <h1 className="register-prompt">Success!
              <p className="line">Sign In</p>
            </h1>
        ) : (
            <section>
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
                <button className="submit-button"
                        disabled={!user || !pwd || !perDescr}>Submit
                </button>
              </form>
              <p className="register-prompt">
                Already registered?
                <span className="line">
                  Sign in here
                </span>
              </p>

            </section>

        )}
      </section>
  )
}

export default SignUp;