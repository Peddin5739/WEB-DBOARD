// Login.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // For navigation
import styles from "./CSS/Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To navigate after successful login

  // Retrieve user state from Redux, with a fallback if undefined
  const user = useSelector((state) => state.user || {});
  const { userData, statusCode, errorMessage } = user;

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, dispatch LOGIN_SUCCESS and navigate to App
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            userData: data, // Store all user data in userData
            statusCode: response.status,
          },
        });
        console.log("User data:", data);
        navigate("/dashboard"); // Navigate to the main application page
      } else {
        // If login fails, dispatch LOGIN_FAILURE
        dispatch({
          type: "LOGIN_FAILURE",
          payload: {
            statusCode: response.status,
            errorMessage: data.message || "Login failed",
          },
        });
      }
    } catch (error) {
      console.error("Login error", error);
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          statusCode: 500,
          errorMessage: "An error occurred during login. Please try again.",
        },
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username" // Changed placeholder from Email to Username
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {/* Display error message or status code if login fails */}
      {statusCode !== null && (
        <div>{errorMessage && <p>Error: {errorMessage}</p>}</div>
      )}
    </div>
  );
}

export default Login;
