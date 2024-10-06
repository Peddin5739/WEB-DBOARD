import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  // Access the user data from Redux state
  const user = useSelector((state) => state.user || {}); // Fallback in case user is undefined
  const { userType, statusCode, errorMessage, isAuthenticated } = user;

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Display user data */}
      {isAuthenticated ? (
        <div>
          <p>Status Code: {statusCode}</p>
          <p>User Type: {userType}</p>
        </div>
      ) : (
        <p>Please login to see user information.</p>
      )}

      {/* Display error message if it exists */}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
}
