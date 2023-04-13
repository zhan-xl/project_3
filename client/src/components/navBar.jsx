import React, {useContext, useEffect, useState} from "react";
import "./navBar.css"
import {json, Link} from "react-router-dom";
import {UserLogIn} from "../App";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";
import axios from "axios";

export default function NavBar(props) {

  function logOut() {
    localStorage.setItem("userLogIn",
        JSON.stringify({logIn: false, userId: ""}));
    window.location.reload();
  }

  function isLoggedIn() {
    if (props.username) {
      return (
          <div className="navbar-box-right">
            <div className="navbar-button">
              <Link to={"/new-post"}>
                New Post
              </Link>
            </div>
            <div className="navbar-username">
              <Link to={"/profile"}>
                {props.username}
                <span className="triangle"> &#9660;</span>
              </Link>
            </div>
            <div className="navbar-button" onClick={logOut}>Log out</div>
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
        </div>
        {isLoggedIn()}
      </div>
  )
}

