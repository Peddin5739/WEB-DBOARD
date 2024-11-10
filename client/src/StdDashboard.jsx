import React from "react";
import { useNavigate } from "react-router-dom";
import "./StdDashboard.css"; // Import the CSS file for styling

export default function StdDashboard() {
  const navigate = useNavigate();

  return (
    <div className="std-dashboard">
      <header className="header">
        <button onClick={() => navigate("/stdCourse")}>Courses</button>
        <button onClick={() => navigate("/stdBooks")}>Books</button>
        <button onClick={() => navigate("/discussion")}>Discussion</button>
        <button onClick={() => navigate("/stdEvents")}>Events</button>
      </header>
      <main className="content">
        <h1>Welcome to the Student Dashboard</h1>
        <p>Select an option from above to get started.</p>
      </main>
    </div>
  );
}
