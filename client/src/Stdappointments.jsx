import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./StdAppointments.css";

export default function StdAppointments() {
  const [facultyNames, setFacultyNames] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [appointmentExists, setAppointmentExists] = useState(null);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Access student ID from Redux
  const user = useSelector((state) => state.user || {});
  const { id: studentId } = user.userData || {};

  // Fetch all faculty names
  useEffect(() => {
    fetch("http://localhost:8080/faculty-names")
      .then((response) => response.json())
      .then((data) => setFacultyNames(data))
      .catch((error) => setError("Failed to load faculty names"));
  }, []);

  // Check if an appointment already exists for the selected faculty
  const checkAppointment = (facultyName) => {
    setSelectedFaculty(facultyName);
    fetch(`http://localhost:8080/check-appointment/${studentId}/${facultyName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Appointment already booked") {
          setAppointmentExists(data.status);
        } else {
          setAppointmentExists(null);
        }
      })
      .catch((error) => setError("Failed to check appointment"));
  };

  // Book a new appointment
  const handleBookAppointment = () => {
    fetch("http://localhost:8080/book-appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: studentId,
        faculty_name: selectedFaculty,
        date,
        time,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccessMessage(data.message);
          setAppointmentExists("pending");
        } else {
          setError("Failed to book appointment");
        }
      })
      .catch((error) => setError("Failed to book appointment"));
  };

  return (
    <div className="std-appointments-container">
      <h1>Book an Appointment</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="faculty-list">
        <h2>Select Faculty</h2>
        <ul>
          {facultyNames.map((faculty, index) => (
            <li
              key={index}
              className="faculty-item"
              onClick={() => checkAppointment(faculty)}
            >
              {faculty}
            </li>
          ))}
        </ul>
      </div>

      {selectedFaculty && (
        <div className="appointment-details">
          <h3>Booking with {selectedFaculty}</h3>
          {appointmentExists ? (
            <p className="appointment-status">Status: {appointmentExists}</p>
          ) : (
            <div>
              <label>
                Date:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label>
                Time:
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>
              <button onClick={handleBookAppointment} className="book-button">
                Book Appointment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
