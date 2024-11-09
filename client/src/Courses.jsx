import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Courses.css";

export default function Courses() {
  const user = useSelector((state) => state.user || {}); // Access user data from Redux
  const facultyId = user.userData?.id; // Get facultyId from Redux user data

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!facultyId) {
      setError("Faculty ID not available.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/faculty-courses/${facultyId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
        setLoading(false);
      });
  }, [facultyId]);

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="courses-container">
      <h2 className="courses-title">
        Courses Taught by {user.userData?.username}
      </h2>
      {courses.length > 0 ? (
        <div className="courses-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3 className="course-name">{course.course_name}</h3>
              <p className="course-info">
                <strong>Semester:</strong> {course.semester}
              </p>
              <p className="course-info">
                <strong>Created At:</strong>{" "}
                {new Date(course.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-courses">No courses found for this faculty member.</p>
      )}
    </div>
  );
}
