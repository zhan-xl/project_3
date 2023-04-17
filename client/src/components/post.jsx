import React, {useEffect, useState} from "react";
import "../style/post.css"
import axios from "axios";
import {Link} from "react-router-dom";

export default function Post(props) {

  return (
      <div className="grid-container">
        <div className="post-avatar-div">
          <img className="post-avatar"
               src={require("../img/charlie-avatar.png")}/>
        </div>
        <div>
          <span className="username">
            {props.user}
          </span>
          <span className="date-and-time">{props.postTime}</span>
        </div>
        <div className="content">{props.postCont}</div>
      </div>
  )
}