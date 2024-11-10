import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./CSS/Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        // If login is successful, dispatch LOGIN_SUCCESS
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            userData: data, // Store all user data in userData
            statusCode: response.status,
          },
        });
        console.log("User data:", data);

        // Check the user's role and navigate accordingly
        if (data.role === "faculty") {
          navigate("/dashboard"); // Navigate to faculty dashboard
        } else if (data.role === "student") {
          navigate("/stdDashboard"); // Navigate to student dashboard
        }
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
      <input
        type="text"
        placeholder="Username"
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
