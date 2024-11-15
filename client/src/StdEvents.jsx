import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./StdEvents.css";

export default function StdEvents() {
  const user = useSelector((state) => state.user || {});
  const { userData = {} } = user;
  const { id: studentId } = userData;

  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  // Fetch events and check registration status for each
  useEffect(() => {
    fetch("http://localhost:8080/std_events")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((data) => {
        const eventsWithStatus = data.map((event) => ({
          ...event,
          isRegistered: null, // Initial status set to null
        }));

        eventsWithStatus.forEach((event, index) => {
          fetch(
            `http://localhost:8080/check-registration/${event.id}/${studentId}`
          )
            .then((response) => response.json())
            .then((statusData) => {
              eventsWithStatus[index].isRegistered =
                statusData.message === "Registered";
              setEvents([...eventsWithStatus]);
            })
            .catch((error) =>
              console.error("Error checking registration:", error)
            );
        });
      })
      .catch((error) => setError(error.message));
  }, [studentId]);

  // Handle Registration
  const handleRegister = (eventId) => {
    fetch("http://localhost:8080/std_register-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, studentId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event.id === eventId ? { ...event, isRegistered: true } : event
            )
          );
        } else {
          setError("Failed to register for the event");
        }
      })
      .catch((error) => setError("Registration error"));
  };

  return (
    <div className="std-events-container">
      <h1>Available Events</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.event_title}</h3>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {event.time}
            </p>
            <p>
              <strong>Venue:</strong> {event.venue}
            </p>
            {event.isRegistered ? (
              <p className="registered-message">You are registered</p>
            ) : (
              <button
                className="register-button"
                onClick={() => handleRegister(event.id)}
              >
                Register
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
