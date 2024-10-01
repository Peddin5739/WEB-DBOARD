import React from "react";
import styles from "./team.module.css";
import linkedInLogo from "/linkedin-logo.png"; // Ensure this is the correct path
import vamsi from "/vamsi.jpeg";
import chandan from "/chandan.jpeg";
function Team() {
  return (
    <div className={styles.content}>
      <h2>Our Team</h2>
      <div className={styles.profilesContainer}>
        {/* Profile 1 */}
        <div className={styles.profile}>
          <img
            src="https://media.licdn.com/dms/image/D5603AQGRXT_d4ko5VQ/profile-displayphoto-shrink_800_800/0/1691519863078?e=2147483647&v=beta&t=xVu2ZrPeggP6_wo1zRak5kAMIA9D0Qh-ENKk1ssv6BM"
            alt="Mounika Preethi kandru"
            className={styles.profileImage}
          />
          <h3 className={styles.profileName}>Mounika Preethi Kandru</h3>
          <a
            href="https://www.linkedin.com/in/mounika-preethi-kandru-b0694b191/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedInLogo}
              alt="LinkedIn"
              className={styles.linkedinLogo}
            />
          </a>
        </div>

        {/* Profile 2 */}
        <div className={styles.profile}>
          <img
            src={vamsi} // Replace with actual image
            alt="Team Member 2"
            className={styles.profileImage}
          />
          <h3 className={styles.profileName}>Sai Venkata Vamsi Gorrela</h3>
          <a
            href="https://www.linkedin.com/in/sai-gorrela/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedInLogo}
              alt="LinkedIn"
              className={styles.linkedinLogo}
            />
          </a>
        </div>

        {/* Profile 3 */}
        <div className={styles.profile}>
          <img
            src={chandan} // Replace with actual image
            alt="Team Member 3"
            className={styles.profileImage}
          />
          <h3 className={styles.profileName}>Chandhan Masireddygari</h3>
          <a
            href="https://www.linkedin.com/in/chandhan-m/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedInLogo}
              alt="LinkedIn"
              className={styles.linkedinLogo}
            />
          </a>
        </div>

        {/* Profile 4 */}
        <div className={styles.profile}>
          <img
            src="path-to-image-4.jpg" // Replace with actual image
            alt="Team Member 4"
            className={styles.profileImage}
          />
          <h3 className={styles.profileName}>Team Member 4</h3>
          <a
            href="https://www.linkedin.com/in/member4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedInLogo}
              alt="LinkedIn"
              className={styles.linkedinLogo}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Team;
