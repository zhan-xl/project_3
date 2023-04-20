import React from "react";
import "../style/navBar.css"
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function NavBar(props) {

  const navigate = useNavigate();
  const {logInUserName} = props;

  const handleLogOut = async () => {
    console.log("this is the log out function");
    await axios.put("/logOut", (req, res) => {
    });
    navigate("/log-out");
  }

  function isLoggedIn() {
    if (logInUserName) {
      return (
          <div className="navbar-box-right">
            <div className="navbar-button">
              <Link to={"/new-post"}>
                New Post
              </Link>
            </div>
            <div className="navbar-username">
              <Link to={"/profile/" + logInUserName} >
                {logInUserName}
                <span className="triangle"> &#9660;</span>
              </Link>
            </div>
            <div className="navbar-button" onClick={handleLogOut}>Log out</div>
            {/*<img className="navbar-avatar"*/}
            {/*     src={require("../img/charlie-avatar.png")}*/}
            {/*     alt="charlie's avatar"></img>*/}
          </div>
      )
    } else {
      return (
          <div className="navbar-box-right">
            <div className="navbar-button">
              <Link to={"/log-in"}>Log In</Link>
            </div>
            <div className="navbar-button">
              <Link to={"/Sign-up"}>Sign Up</Link>
            </div>
          </div>
      )
    }
  }

  return (
      <div className='navbar-frame'>
        <div className="navbar-box-left">
          <div className="navbar-button"><Link to={"/"}>Home</Link></div>
          <div className="navbar-button"><Link to={"/search"}>Search</Link></div>
        </div>
        {isLoggedIn()}
      </div>
  )
}

