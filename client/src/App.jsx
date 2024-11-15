import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Discussion from "./Discussion";
import Manage_books from "./Manage_books";
import Events from "./Events";
import StdDashboard from "./StdDashboard";
import StdCourse from "./StdCourse";
import StdBooks from "./StdBooks";
import StdEvents from "./StdEvents";
import Stdappointments from "./Stdappointments";
import Appointments from "./Appointments";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/manageBooks" element={<Manage_books />} />
        <Route path="/events" element={<Events />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/stdDashboard" element={<StdDashboard />} />
        <Route path="/stdCourse" element={<StdCourse />} />
        <Route path="/stdBooks" element={<StdBooks />} />
        <Route path="/stdEvents" element={<StdEvents />} />
        <Route path="/stdappointments" element={<Stdappointments />} />
      </Routes>
    </Router>
  );
}

export default App;
