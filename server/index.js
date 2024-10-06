const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
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

// POST /validateuser - login route (without bcrypt)
app.post("/validateuser", (req, res) => {
  const { email, password } = req.body;

  // Query the database to find the user by email
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "false", message: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ status: "false", message: "Invalid email or password" });
    }

    const user = results[0];

    // Compare the plain text password
    if (password === user.password) {
      // Login success, send the user type (role)
      res.json({ status: "true", usertype: user.role });
    } else {
      // Invalid password
      res
        .status(401)
        .json({ status: "false", message: "Invalid email or password" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
