
import React, { useState } from "react";
import { auth } from "./firebase"; // Import the Firebase auth instance
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./index.css"; // Import your CSS file


function SignUp({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("Registered as:", user.email);
      onClose(); // Close the signup pop-up after successful signup
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div className="signup-popup">
      <div className="signup-container">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h4>Create a Dev@Deakin Account</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className="b1">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
