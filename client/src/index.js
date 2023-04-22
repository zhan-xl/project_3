import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/style/index.css';
import App from './src/App';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App/>}/>
          </Routes>
      </BrowserRouter>
    </React.StrictMode>
);
