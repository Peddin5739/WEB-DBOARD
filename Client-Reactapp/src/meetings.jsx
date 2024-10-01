import React, { useState } from "react";
import meetingdata from "./data";
import styles from "./meetings.module.css"; // Assuming this is the correct path

function Meetings() {
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const handleMeetingClick = (meeting) => {
    setSelectedMeeting(meeting);
  };

  return (
    <div className={styles.content}>
      <h2>Meetings Overview</h2>
      <p>
        This is the Meetings page. Here you can find information about upcoming
        and past meetings.
      </p>

      <div className={styles.meetingsList}>
        {meetingdata.map((meeting, index) => (
          <button
            key={index}
            onClick={() => handleMeetingClick(meeting)}
            className={styles.meetingDateButton}
          >
            {meeting.MeetingDate}
          </button>
        ))}
      </div>

      {selectedMeeting && (
        <div className={styles.meetingDetails}>
          <h3>Details for {selectedMeeting.MeetingDate}</h3>
          <p>
            <strong>Start Time:</strong> {selectedMeeting.Start_Time}
          </p>
          <p>
            <strong>End Time:</strong> {selectedMeeting["End Time"]}
          </p>
          <p>
            <strong>Attendance:</strong> {selectedMeeting.Attendance}
          </p>
          <p>
            <strong>Items Discussed:</strong>{" "}
            {selectedMeeting["Items Discussed"]}
          </p>
          <p>
            <strong>Items for Next Meeting:</strong>{" "}
            {selectedMeeting["Items for next meeting"]}
          </p>
        </div>
      )}
    </div>
  );
}

export default Meetings;
