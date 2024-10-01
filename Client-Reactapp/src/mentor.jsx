import React from "react";
import styles from "./mentors.module.css";

function Mentors() {
  return (
    <div className={styles.content}>
      <h2>Our Mentors</h2>

      <div className={styles.profile}>
        <img
          src="https://i1.rgstatic.net/ii/profile.image/783495022530560-1563811178139_Q512/Pradeep-Buddharaju.jpg"
          alt="Mentor 1"
          className={styles.profileImage}
        />
        <h3 className={styles.profileName}>Pradeep Buddharaju , Ph.D</h3>
        <p className={styles.profileDescription}>
          Associate Professor of Computer Science and Computer Information
          Systems, College of Science and Engineering
        </p>
      </div>

      <div className={styles.profile}>
        <img src="" alt="Mentor 2" className={styles.profileImage} />
        <h3 className={styles.profileName}>Channa Weeratunge</h3>
        <p className={styles.profileDescription}>
          Chief Engineer - Controls/Software
        </p>
      </div>
    </div>
  );
}

export default Mentors;
