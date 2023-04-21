// this is from firebase website after registring twitter-clone web app

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkawq3OiaL83smcsuPhakOfYgbqSiOxHw",
  authDomain: "twitter-clone-4befd.firebaseapp.com",
  projectId: "twitter-clone-4befd",
  storageBucket: "twitter-clone-4befd.appspot.com",
  messagingSenderId: "524603261064",
  appId: "1:524603261064:web:fac03e898acbe72d379f3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;