import React, { useState } from "react";
import { auth } from "./firebase"; // Import the Firebase auth instance
import { signInWithEmailAndPassword } from "firebase/auth";
import "./index.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";
import Sign_Up from "./Sign_Up"; // Import the Signup component

function Login({ toggleLogin }) {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error message

  const openSign_up = () => {
    setShowSignup(true);
  };
  
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Logged in as:", user.email);
      toggleLogin(); // Close the login popup
      history("./home");
    } catch (error) {
      console.error("Login error:", error.message);
      // Set the error message here
      setErrorMessage("Wrong email or password. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <div className="login-container">
        <span className="close-btn" onClick={toggleLogin}>
          &times;
        </span>
        <li>
          <a href="#" onClick={openSign_up} className="signup-link">
            SIGN UP
          </a>
        </li>
        <h2>Login</h2>
        <div className="input-container">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        {showSignup && <Sign_Up onClose={() => setShowSignup(false)} />}
      </div>
    </div>
  );
}

export default Login;
