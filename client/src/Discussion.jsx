import React, { useEffect, useState, useRef } from "react";
import "./Discussion.css";

export default function Discussion() {
  const [discussions, setDiscussions] = useState([]);
  const [message, setMessage] = useState("");
  const chatBoxRef = useRef(null);

  // Fetch discussions from the server
  const fetchDiscussions = async () => {
    try {
      const response = await fetch("http://localhost:8080/discussions");
      const data = await response.json();
      setDiscussions(data);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  // Post a new discussion
  const postDiscussion = async () => {
    if (message.trim() === "") return;

    const newDiscussion = {
      course_id: 1,
      user_id: 2,
      message,
      attachment: null,
      created_at: new Date().toISOString(),
    };

    try {
      await fetch("http://localhost:8080/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiscussion),
      });
      setMessage(""); // Clear the message input after posting
      fetchDiscussions(); // Refresh discussions immediately after posting
    } catch (error) {
      console.error("Error posting discussion:", error);
    }
  };

  // Scroll to bottom whenever discussions are updated
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [discussions]);

  useEffect(() => {
    fetchDiscussions(); // Initial fetch

    // Set up an interval to fetch discussions every 40 seconds
    const intervalId = setInterval(fetchDiscussions, 40000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="discussion-container">
      <div className="chat-box" ref={chatBoxRef}>
        {discussions
          .slice()
          .reverse()
          .map((discussion) => (
            <div key={discussion.id} className="chat-message">
              <div className="message-content">{discussion.message}</div>
              <div className="message-timestamp">
                {new Date(discussion.created_at).toLocaleString()}
              </div>
            </div>
          ))}
      </div>

      <div className="input-bar">
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button" onClick={postDiscussion}>
          ➤
        </button>
      </div>
    </div>
  );
}
