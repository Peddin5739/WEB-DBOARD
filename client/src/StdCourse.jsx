import React, { useEffect, useState } from "react";
import "./StdCourse.css"; // Assuming you have a CSS file for styling
import { useSelector } from "react-redux";

export default function StdCourse() {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingMyCourses, setLoadingMyCourses] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user || {});
  const { userData = {} } = user;
  const { id: studentId } = userData;

  // Fetch all available courses
  const fetchCourses = () => {
    setLoadingCourses(true);
    fetch("http://localhost:8080/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoadingCourses(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
        setLoadingCourses(false);
      });
  };

  // Fetch courses the student is registered for
  const fetchMyCourses = () => {
    setLoadingMyCourses(true);
    fetch(`http://localhost:8080/enrollments?student_id=${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setMyCourses(data);
        setLoadingMyCourses(false);
      })
      .catch((err) => {
        console.error("Error fetching my courses:", err);
        setError("Failed to load your courses.");
        setLoadingMyCourses(false);
      });
  };

  // Handle course registration
  const handleRegister = (courseId) => {
    fetch("http://localhost:8080/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId, course_id: courseId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Registered successfully!");
          fetchMyCourses(); // Refresh the student's registered courses
        } else {
          alert("Registration failed.");
        }
      })
      .catch((err) => {
        console.error("Error registering for course:", err);
        alert("An error occurred while registering.");
      });
  };

  useEffect(() => {
    fetchCourses();
    fetchMyCourses();
  }, []);

  if (loadingCourses) return <div>Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="std-course-container">
      <h2>Available Courses</h2>
      <div className="course-list">
        {courses.map((course) => (
          <div key={course.course_id} className="course-card">
            <h3>{course.course_name}</h3>
            <p>
              <strong>Semester:</strong> {course.semester}
            </p>
            <p>
              <strong>Faculty:</strong> {course.faculty_name}
            </p>
            <button onClick={() => handleRegister(course.course_id)}>
              Register
            </button>
          </div>
        ))}
      </div>

      <h2>My Courses</h2>
      <button onClick={fetchMyCourses} className="view-my-courses-button">
        {loadingMyCourses ? "Loading..." : "Refresh My Courses"}
      </button>
      <div className="my-course-list">
        {myCourses.length > 0 ? (
          myCourses.map((course) => (
            <div key={course.enrollment_id} className="course-card">
              <h3>{course.course_name}</h3>
              <p>
                <strong>Semester:</strong> {course.semester}
              </p>
              <p>
                <strong>Faculty:</strong> {course.faculty_name}
              </p>
              <p>
                <strong>Enrolled At:</strong>{" "}
                {new Date(course.enrolled_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No courses registered yet.</p>
        )}
      </div>
    </div>
  );
}
