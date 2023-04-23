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

  return (
      <div className='navbar-frame'>

        <div className="navbar-box-left">
          <div ><Link to={"/"} className="btn">Home</Link></div>
          <div ><Link to={"/search"} className="btn">Search</Link></div>
          {logInUserName ?
              (<div>
                <Link to={"/new-post"} className="btn">
                  New Post
                </Link>
              </div>) :
              ""
          }
        </div>

          {logInUserName ? (
              <div className="navbar-box-right">

              <div className="navbar-username">
                    Welcome {logInUserName}!
                </div>
                <div>
                  <Link to={"/profile/" + logInUserName} className="btn">
                    My Profile
                  </Link>
                </div>
                <div className="btn" onClick={handleLogOut}>Log out</div>
              </div>
          ) : (
              <div className="navbar-box-right">
                <div className="btn">
                  <Link to={"/log-in"}>Log In</Link>
                </div>
                <div className="btn">
                  <Link to={"/Sign-up"}>Sign Up</Link>
                </div>
              </div>
          )}
      </div>
  );

}

