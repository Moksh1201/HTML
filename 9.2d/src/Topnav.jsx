import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login"; 

function Topnav() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handlePostClick = () => {
    navigate("/content");
  };

  return (
    <div className="nav">
      <div className="wrap1">
        <h4>Dev@Deakin</h4>
        <div className="search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="nav-bar">
          <ul>
            <li>
              <button onClick={handlePostClick}>POST</button>
            </li>
            <li>
              <button onClick={toggleLogin}>LOGIN</button>
            </li>
            <li>
              <Link className="buylink" to="/pricing">Buy?</Link> {/* Use Link to navigate */}
            </li>
          </ul>
        </div>
      </div>

      {showLogin && <Login toggleLogin={toggleLogin} />}
      {/* Your existing code */}
    </div>
  );
}

export default Topnav;
