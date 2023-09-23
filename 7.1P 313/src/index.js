// code 4
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Bar from './Topnav'
import Home_Page from './Home_Page';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
// import LoginPopup from './Loginpage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Bar/>} />
        <Route path="/home" element={<Home_Page/>} />

      </Routes>
    </div>
    </BrowserRouter>
    
  </div>
  
);