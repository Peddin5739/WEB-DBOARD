import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Import the CSS file

export default function Dashboard() {
  const user = useSelector((state) => state.user || {}); // Access the user data from Redux state
  const { userData = {}, isAuthenticated, errorMessage } = user;
  const { id, role, username } = userData; // Extract role and username from userData

  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Display navigation buttons if the user is a faculty */}
      {isAuthenticated && role === "faculty" ? (
        <>
          <div className="header-buttons">
            <button onClick={() => navigate("/courses")}>Courses</button>
            <button onClick={() => navigate("/discussion")}>Discussion</button>
            <button onClick={() => navigate("/manageBooks")}>
              Manage Books
            </button>
            <button onClick={() => navigate("/events")}>Events</button>
          </div>
          <div className="welcome-message">Welcome, {username}!</div>
        </>
      ) : (
        <p>Please login to see user information.</p>
      )}

      {/* Display error message if it exists */}
      {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
    </div>
  );
}
