import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Appointments.css";

export default function Appointments() {
  const user = useSelector((state) => state.user || {}); // Access user data from Redux
  const facultyName = user.userData?.username;
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (facultyName) {
      const fetchUrl = `http://localhost:8080/appointments/${facultyName}`;
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch appointments: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => setAppointments(data))
        .catch((error) => setError("Error fetching appointments"));
    }
  }, [facultyName]);

  const handleStatusUpdate = (id, status) => {
    fetch(`http://localhost:8080/appointments/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status");
        }
        return response.json();
      })
      .then(() => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id ? { ...appointment, status } : appointment
          )
        );
      })
      .catch((error) => setError("Failed to update status"));
  };

  return (
    <div className="appointments-container">
      <h1>Appointments for {facultyName || "Unknown Faculty"}</h1>
      {error && <p className="error-message">{error}</p>}
      {appointments.length > 0 ? (
        <ul className="appointments-list">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="appointment-item">
              <p>
                <strong>Student ID:</strong> {appointment.student_id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
              <p>
                <strong>Status:</strong> {appointment.status}
              </p>
              <div className="action-buttons">
                <button
                  className="confirm-button"
                  onClick={() =>
                    handleStatusUpdate(appointment.id, "confirmed")
                  }
                  disabled={appointment.status === "confirmed"}
                >
                  Confirm
                </button>
                <button
                  className="cancel-button"
                  onClick={() =>
                    handleStatusUpdate(appointment.id, "cancelled")
                  }
                  disabled={appointment.status === "cancelled"}
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No appointments found for this faculty member.</p>
      )}
    </div>
  );
}
