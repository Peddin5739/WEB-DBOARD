import React from "react";
import styles from "./videos.module.css";

function Videos() {
  // Replace these URLs with the URLs of the videos you want to display
  const videoUrls = [
    "https://www.youtube.com/embed/ems8OM_cWtw",
    "https://www.youtube.com/embed/iSvOIXQo_YQ",
    "https://www.youtube.com/embed/Gc5JF2TUG7o",
  ];

  return (
    <div className={styles.content}>
      <h2>Videos Page</h2>
      <p>chart-js filter working videos</p>
      <div className={styles.videoContainer}>
        {videoUrls.map((url, index) => (
          <iframe
            key={index}
            src={url}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            className={styles.video}
          ></iframe>
        ))}
      </div>
    </div>
  );
}

export default Videos;
