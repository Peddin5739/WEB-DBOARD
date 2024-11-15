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
// Endpoint to get books based on faculty_id
app.get("/books/:facultyId", (req, res) => {
  const { facultyId } = req.params;

  const query = "SELECT * FROM books WHERE faculty_id = ?";

  db.query(query, [facultyId], (err, results) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

// Endpoint to allow faculty to add a new book
app.post("/books", (req, res) => {
  const { book_title, author, faculty_id } = req.body;

  // Check if all required fields are provided
  if (!book_title || !author || !faculty_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO books (book_title, author, faculty_id, created_at)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(query, [book_title, author, faculty_id], (err, results) => {
    if (err) {
      console.error("Error adding book:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      success: true,
      message: "Book added successfully",
      bookId: results.insertId,
    });
  });
});

// Endpoint to get all events
// Endpoint to get events based on the created_by field
app.get("/events", (req, res) => {
  const { created_by } = req.query;

  // Check if created_by is provided
  if (!created_by) {
    return res.status(400).json({ error: "created_by is required" });
  }

  // Query to get events created by the specified user
  const query =
    "SELECT * FROM events WHERE created_by = ? ORDER BY date DESC, time DESC";

  db.query(query, [created_by], (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});
// Endpoint to get all courses with faculty names
app.get("/courses", (req, res) => {
  const query = `
    SELECT 
      courses.id AS course_id,
      courses.course_name,
      courses.semester,
      users.username AS faculty_name,
      courses.created_at
    FROM 
      courses
    LEFT JOIN 
      users ON courses.faculty_id = users.id
    ORDER BY 
      courses.created_at DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching course details:", err);
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

// Endpoint to get enrollments by student ID
app.get("/enrollments", (req, res) => {
  const { student_id } = req.query;

  if (!student_id) {
    return res
      .status(400)
      .json({ error: "student_id query parameter is required" });
  }

  const query = `
    SELECT 
      enrollments.id AS enrollment_id,
      courses.course_name,
      courses.semester,
      users.username AS faculty_name,
      enrollments.enrolled_at
    FROM 
      enrollments
    JOIN 
      courses ON enrollments.course_id = courses.id
    JOIN 
      users ON courses.faculty_id = users.id
    WHERE 
      enrollments.student_id = ?
    ORDER BY 
      enrollments.enrolled_at DESC
  `;

  db.query(query, [student_id], (err, results) => {
    if (err) {
      console.error("Error fetching enrollments:", err);
      return res
        .status(500)
        .json({ error: "Database error while fetching enrollments" });
    }

    res.json(results);
  });
});

// Endpoint to enroll a student in a course
app.post("/enroll", (req, res) => {
  const { student_id, course_id } = req.body;

  if (!student_id || !course_id) {
    return res
      .status(400)
      .json({ error: "student_id and course_id are required" });
  }

  const query = `
    INSERT INTO enrollments (student_id, course_id, enrolled_at)
    VALUES (?, ?, NOW())
  `;

  db.query(query, [student_id, course_id], (err, results) => {
    if (err) {
      console.error("Error enrolling student:", err);
      return res
        .status(500)
        .json({ error: "Database error while enrolling student" });
    }

    res.json({
      success: true,
      message: "Student enrolled successfully",
      enrollmentId: results.insertId,
    });
  });
});
//student manage books
app.get("/enrolled-books/:studentId", (req, res) => {
  const { studentId } = req.params;

  const query = `
    SELECT 
      books.id AS book_id,
      books.book_title,
      books.author,
      books.created_at,
      users.username AS faculty_name
    FROM 
      enrollments
    JOIN 
      courses ON enrollments.course_id = courses.id
    JOIN 
      books ON courses.faculty_id = books.faculty_id
    JOIN 
      users ON books.faculty_id = users.id
    WHERE 
      enrollments.student_id = ?
    ORDER BY 
      books.created_at DESC;
  `;

  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching books based on enrolled courses:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});
app.get("/check-transaction/:bookId/:studentId", (req, res) => {
  const { bookId, studentId } = req.params;

  const query = `
    SELECT 
      id, 
      transaction_type, 
      amount, 
      status, 
      transaction_date 
    FROM 
      book_transactions 
    WHERE 
      book_id = ? AND student_id = ?
    LIMIT 1;
  `;

  db.query(query, [bookId, studentId], (err, results) => {
    if (err) {
      console.error("Error checking transaction:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      // No transaction found for the given book_id and student_id
      return res.json({ message: "Transaction not available" });
    }

    // Transaction found, return transaction details
    res.json(results[0]);
  });
});
// POST endpoint to add a transaction to book_transactions
app.post("/book-transaction", (req, res) => {
  const { book_id, student_id, transaction_type } = req.body;
  let amount;

  // Set amount based on transaction type
  if (transaction_type === "rent") {
    amount = 20.0;
  } else if (transaction_type === "buy") {
    amount = 50.0;
  } else {
    return res.status(400).json({ error: "Invalid transaction type" });
  }

  const query = `
    INSERT INTO book_transactions (book_id, student_id, transaction_type, transaction_date, amount, status)
    VALUES (?, ?, ?, NOW(), ?, 'active')
  `;

  db.query(
    query,
    [book_id, student_id, transaction_type, amount],
    (err, result) => {
      if (err) {
        console.error("Error adding transaction:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ success: true, message: "Transaction added successfully" });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
