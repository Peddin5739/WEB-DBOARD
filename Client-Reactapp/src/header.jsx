import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styles from "./header.module.css"; // Importing the CSS module
import Home from "./home";
import Mentors from "./mentor";
import Team from "./team";
import Meetings from "./meetings";
import Milestones from "./milestones";
import Videos from "./videos";

function HeaderContentComponent() {
  return (
    <Router>
      <div className={styles.headerContentContainer}>
        <header className={styles.header}>
          <div className={styles.salesApplication}>
            <h1>Team Docker</h1>
          </div>
          <nav className={styles.navigation}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/mentors">Mentors</Link>
              </li>
              <li>
                <Link to="/team">Team</Link>
              </li>
              <li>
                <Link to="/meetings">Meetings</Link>
              </li>
              <li>
                <Link to="/milestones">Milestones</Link>
              </li>
              <li>
                <Link to="/videos">Videos</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/team" element={<Team />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default HeaderContentComponent;
