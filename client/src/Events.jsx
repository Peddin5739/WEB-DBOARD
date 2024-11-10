import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Events.css"; // Assuming you have a CSS file for styling

export default function Events() {
  const user = useSelector((state) => state.user || {});
  const { userData = {} } = user;
  const { id: createdBy } = userData; // Extract user ID for filtering events

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEvent, setNewEvent] = useState({
    event_title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    created_by: createdBy,
  });
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch events created by the current user
  const fetchEvents = () => {
    fetch(`http://localhost:8080/events?created_by=${createdBy}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, [createdBy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingEvent) {
      setEditingEvent((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewEvent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateEvent = () => {
    fetch("http://localhost:8080/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newEvent, created_by: createdBy }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchEvents();
          setNewEvent({
            event_title: "",
            description: "",
            date: "",
            time: "",
            venue: "",
            created_by: createdBy,
          });
        } else {
          setError("Failed to create event.");
        }
      })
      .catch((err) => {
        console.error("Error creating event:", err);
        setError("Failed to create event.");
      });
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:8080/events/${editingEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchEvents();
          setEditingEvent(null);
        } else {
          setError("Failed to update event.");
        }
      })
      .catch((err) => {
        console.error("Error updating event:", err);
        setError("Failed to update event.");
      });
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="events-container">
      <h2>Events</h2>

      {/* Display all events */}
      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            {editingEvent && editingEvent.id === event.id ? (
              <>
                <input
                  type="text"
                  name="event_title"
                  value={editingEvent.event_title}
                  onChange={handleChange}
                  placeholder="Event Title"
                />
                <textarea
                  name="description"
                  value={editingEvent.description}
                  onChange={handleChange}
                  placeholder="Description"
                ></textarea>
                <input
                  type="date"
                  name="date"
                  value={editingEvent.date}
                  onChange={handleChange}
                />
                <input
                  type="time"
                  name="time"
                  value={editingEvent.time}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="venue"
                  value={editingEvent.venue}
                  onChange={handleChange}
                  placeholder="Venue"
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingEvent(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{event.event_title}</h3>
                <p>{event.description}</p>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <p>
                  <strong>Time:</strong> {event.time}
                </p>
                <p>
                  <strong>Venue:</strong> {event.venue}
                </p>
                <button onClick={() => handleEditEvent(event)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Form to create a new event */}
      <div className="new-event-form">
        <h3>Create New Event</h3>
        <input
          type="text"
          name="event_title"
          value={newEvent.event_title}
          onChange={handleChange}
          placeholder="Event Title"
        />
        <textarea
          name="description"
          value={newEvent.description}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={newEvent.time}
          onChange={handleChange}
        />
        <input
          type="text"
          name="venue"
          value={newEvent.venue}
          onChange={handleChange}
          placeholder="Venue"
        />
        <button onClick={handleCreateEvent}>Create Event</button>
      </div>
    </div>
  );
}
