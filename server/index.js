const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
const port = 8080;

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "Naveen@2628", // Your MySQL password
  database: "dboard", // Your MySQL database
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

// Login endpoint
// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Query to find the user by username
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  // Execute the query
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error executing the query:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Check if user exists and if the password matches
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Send all user data (without password) to the frontend
    const { password, ...userData } = results[0]; // Exclude password
    res.json(userData);
  });
});
// Endpoint to get all courses taught by a specific faculty
app.get("/faculty-courses/:facultyId", (req, res) => {
  const { facultyId } = req.params;

  // Query to select all courses where faculty_id matches
  const query = "SELECT * FROM courses WHERE faculty_id = ?";

  // Execute the query
  db.query(query, [facultyId], (err, results) => {
    if (err) {
      console.error("Error executing the query:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Send the list of courses back to the frontend
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
