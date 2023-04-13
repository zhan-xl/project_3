import React, {createContext, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css"
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import NavBar from "./components/navBar";
import NewPost from "./pages/NewPost";
import axios from "axios";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/log-in' element={<LogIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/new-post" element={<NewPost/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
