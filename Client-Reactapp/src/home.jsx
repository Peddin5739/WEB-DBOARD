import React from "react";
import styles from "./home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.headingBox}>
        <h1 className={styles.productHeading}>Optime Subsea DataSphere</h1>
        <p className={styles.productDescription}>
          Welcome to 'Subsea DataSphere', our latest project for Spring 2024.
          We're taking a big step forward in how we handle data from oil and gas
          operations at sea. Our team is building on a web app created last
          fall, making it even better. We're adding new tech to show data in
          real-time and making graphs easier to use and understand. This project
          is all about making complex offshore data simple and useful for
          everyone.
        </p>
      </div>
    </div>
  );
}

export default Home;
