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

// Endpoint to post a new discussion
app.post("/discussions", (req, res) => {
  const { course_id, user_id, message, attachment } = req.body;

  // Query to insert a new discussion entry
  const query =
    "INSERT INTO discussions (course_id, user_id, message, attachment, created_at) VALUES (?, ?, ?, ?, NOW())";

  // Execute the query
  db.query(query, [course_id, user_id, message, attachment], (err, results) => {
    if (err) {
      console.error("Error executing the query:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Respond with the inserted discussion ID
    res.json({
      success: true,
      message: "Discussion posted successfully",
      discussionId: results.insertId,
    });
  });
});

// Endpoint to get all discussions
app.get("/discussions", (req, res) => {
  // Query to select all discussions
  const query = "SELECT * FROM discussions ORDER BY created_at DESC";

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing the query:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Send the list of discussions back to the frontend
    res.json(results);
  });
});

// Endpoint to get all book transactions along with the username of each user
app.get("/book-transactions", (req, res) => {
  // Query to select all book transactions and include the username from the users table
  const query = `
    SELECT 
      bt.id, 
      bt.book_id, 
      bt.student_id, 
      bt.transaction_type, 
      bt.amount, 
      bt.status, 
      bt.transaction_date, 
      u.username AS student_username
    FROM 
      book_transactions bt
    JOIN 
      users u ON bt.student_id = u.id
    ORDER BY 
      bt.transaction_date DESC
  `;

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing the query:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // Send the list of transactions with usernames back to the frontend
    res.json(results);
  });
});

// Endpoint to update a specific book transaction
app.put("/book-transactions/:transactionId", (req, res) => {
  const { transactionId } = req.params;
  const { book_id, student_id, transaction_type, amount, status } = req.body;

  // Query to update the specified transaction
  const query = `
    UPDATE book_transactions 
    SET book_id = ?, student_id = ?, transaction_type = ?, amount = ?, status = ?
    WHERE id = ?
  `;

  // Execute the query
  db.query(
    query,
    [book_id, student_id, transaction_type, amount, status, transactionId],
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        return res.status(500).json({ error: "Database error" });
      }

      // Check if any row was actually updated
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      // Respond with a success message
      res.json({
        success: true,
        message: "Transaction updated successfully",
      });
    }
  );
});

// Endpoint to get all events
app.get("/events", (req, res) => {
  // Corrected query to use `date` and `time` instead of `event_date`
  const query = "SELECT * FROM events ORDER BY date DESC, time DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

// Endpoint to create a new event
app.post("/events", (req, res) => {
  const { event_title, description, date, time, venue, created_by } = req.body;

  // Check if all required fields are provided
  if (!event_title || !description || !date || !time || !venue || !created_by) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Query to insert a new event
  const query = `
    INSERT INTO events (event_title, description, date, time, venue, created_by, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(
    query,
    [event_title, description, date, time, venue, created_by],
    (err, results) => {
      if (err) {
        console.error("Error posting event:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({
        success: true,
        message: "Event added successfully",
        eventId: results.insertId,
      });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
