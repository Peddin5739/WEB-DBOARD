import React, { useState } from "react";
import styles from "./milestones.module.css";

function Milestones() {
  // Define the array of milestones
  const milestones = [
    { name: "milestone1", description: "This is milestone 1 description" },
    { name: "milestone2", description: "This is milestone 2 description" },
  ];

  // State to keep track of the selected milestone
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Function to handle button click
  const handleButtonClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  return (
    <div className={styles.content}>
      <h2>I am Milestones</h2>
      <p>
        This is the Milestones page. Here you can learn about important
        milestones and achievements.
      </p>
      <div>
        {milestones.map((milestone, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(milestone)}
            className={styles.milestoneButton}
          >
            {milestone.name}
          </button>
        ))}
      </div>
      {selectedMilestone && (
        <div className={styles.milestoneDescription}>
          <p>{selectedMilestone.description}</p>
        </div>
      )}
    </div>
  );
}

export default Milestones;
