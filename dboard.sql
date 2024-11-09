create database dboard;
use dboard;

CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'faculty') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from users;

CREATE TABLE courses (
  id INT PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  faculty_id INT,
  semester VARCHAR(50) NOT NULL CHECK (semester IN ('Fall 2024', 'Spring 2024')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (faculty_id) REFERENCES users(id)
  ON DELETE SET NULL ON UPDATE CASCADE
);
select * from Courses;

CREATE TABLE enrollments (
  id INT PRIMARY KEY,
  student_id INT,
  course_id INT,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);
select * from enrollments;

CREATE TABLE discussions (
  id INT PRIMARY KEY,
  course_id INT,
  user_id INT,
  message TEXT NOT NULL,
  attachment VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);
select * from discussions;

CREATE TABLE books (
  id INT PRIMARY KEY,
  book_title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  faculty_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (faculty_id) REFERENCES users(id)
  ON DELETE SET NULL ON UPDATE CASCADE
);

select * from books;

CREATE TABLE book_transactions (
  id INT PRIMARY KEY,
  book_id INT,
  student_id INT,
  transaction_type ENUM('rent', 'buy', 'sell') NOT NULL,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
  status VARCHAR(50) NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);

select * from book_transactions;

CREATE TABLE events (
  id INT PRIMARY KEY,
  event_title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  venue VARCHAR(255) NOT NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
  ON DELETE SET NULL ON UPDATE CASCADE
);
select * from events;

CREATE TABLE event_registrations (
  id INT PRIMARY KEY,
  event_id INT,
  student_id INT,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);

select * from event_registrations;

CREATE TABLE appointments (
  id INT PRIMARY KEY,
  student_id INT,
  department_name VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);

select * from appointments;

CREATE TABLE follows (
  following_user_id INT,
  followed_user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (following_user_id, followed_user_id),
  FOREIGN KEY (following_user_id) REFERENCES users(id)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (followed_user_id) REFERENCES users(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);
select * from follows;

CREATE TABLE posts (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  user_id INT,
  status VARCHAR(50) NOT NULL CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);
select * from Posts;

INSERT INTO users (id, username, email, password, role, created_at) VALUES
(1, 'john_doe', 'john@example.com', 'password1', 'student', NOW()),
(2, 'jane_doe', 'jane@example.com', 'password2', 'faculty', NOW()),
(3, 'alice_wong', 'alice@example.com', 'password3', 'student', NOW()),
(4, 'bob_smith', 'bob@example.com', 'password4', 'faculty', NOW()),
(5, 'charlie_miller', 'charlie@example.com', 'password5', 'student', NOW()),
(6, 'david_lee', 'david@example.com', 'password6', 'faculty', NOW()),
(7, 'emily_clark', 'emily@example.com', 'password7', 'student', NOW()),
(8, 'frank_jones', 'frank@example.com', 'password8', 'faculty', NOW()),
(9, 'grace_hall', 'grace@example.com', 'password9', 'student', NOW()),
(10, 'henry_brown', 'henry@example.com', 'password10', 'faculty', NOW());

INSERT INTO courses (id, course_name, faculty_id, semester, created_at) VALUES
(1, 'Introduction to Programming', 2, 'Fall 2024', NOW()),
(2, 'Data Structures', 4, 'Fall 2024', NOW()),
(3, 'Database Systems', 6, 'Fall 2024', NOW()),
(4, 'Operating Systems', 8, 'Spring 2024', NOW()),
(5, 'Web Development', 2, 'Spring 2024', NOW()),
(6, 'Software Engineering', 4, 'Fall 2024', NOW()),
(7, 'Artificial Intelligence', 6, 'Fall 2024', NOW()),
(8, 'Machine Learning', 8, 'Spring 2024', NOW()),
(9, 'Cloud Computing', 2, 'Fall 2024', NOW()),
(10, 'Big Data Analytics', 4, 'Spring 2024', NOW());


INSERT INTO enrollments (id, student_id, course_id, enrolled_at) VALUES
(1, 1, 1, NOW()),
(2, 3, 2, NOW()),
(3, 5, 3, NOW()),
(4, 7, 4, NOW()),
(5, 9, 5, NOW()),
(6, 1, 6, NOW()),
(7, 3, 7, NOW()),
(8, 5, 8, NOW()),
(9, 7, 9, NOW()),
(10, 9, 10, NOW());

select * from enrollments;

INSERT INTO enrollments (id, student_id, course_id, enrolled_at) VALUES
(11, 11, 1, NOW()),
(12, 11, 2, NOW()),
(13, 11, 10, NOW());






INSERT INTO discussions (id, course_id, user_id, message, attachment, created_at) VALUES
(1, 1, 1, 'What are the assignments for next week?', '', NOW()),
(2, 2, 3, 'Can someone help me with binary trees?', '', NOW()),
(3, 3, 5, 'What is the deadline for the project?', '', NOW()),
(4, 4, 7, 'Any tips on multi-threading in Java?', '', NOW()),
(5, 5, 9, 'Do we have any extra reading material?', '', NOW()),
(6, 6, 1, 'What is the best framework for web development?', '', NOW()),
(7, 7, 3, 'Can someone explain backpropagation?', '', NOW()),
(8, 8, 5, 'Is the final exam cumulative?', '', NOW()),
(9, 9, 7, 'When is the lab session?', '', NOW()),
(10, 10, 9, 'Any guest lectures planned?', '', NOW());



INSERT INTO books (id, book_title, author, faculty_id, created_at) VALUES
(1, 'Introduction to Algorithms', 'Cormen et al.', 2, NOW()),
(2, 'Clean Code', 'Robert C. Martin', 4, NOW()),
(3, 'Database Systems', 'Elmasri & Navathe', 6, NOW()),
(4, 'Operating System Concepts', 'Silberschatz et al.', 8, NOW()),
(5, 'Artificial Intelligence: A Modern Approach', 'Russell & Norvig', 2, NOW()),
(6, 'Python Crash Course', 'Eric Matthes', 4, NOW()),
(7, 'Deep Learning', 'Ian Goodfellow', 6, NOW()),
(8, 'The Pragmatic Programmer', 'Andrew Hunt & David Thomas', 8, NOW()),
(9, 'Data Science from Scratch', 'Joel Grus', 2, NOW()),
(10, 'Cloud Computing: Concepts & Technology', 'Thomas Erl', 4, NOW());


INSERT INTO book_transactions (id, book_id, student_id, transaction_type, transaction_date, amount, status) VALUES
(1, 1, 1, 'rent', NOW(), 30.00, 'active'),
(2, 2, 3, 'buy', NOW(), 50.00, 'completed'),
(3, 3, 5, 'rent', NOW(), 40.00, 'active'),
(4, 4, 7, 'buy', NOW(), 60.00, 'completed'),
(5, 5, 9, 'sell', NOW(), 20.00, 'completed'),
(6, 6, 1, 'rent', NOW(), 25.00, 'active'),
(7, 7, 3, 'buy', NOW(), 70.00, 'completed'),
(8, 8, 5, 'sell', NOW(), 35.00, 'completed'),
(9, 9, 7, 'rent', NOW(), 30.00, 'active'),
(10, 10, 9, 'buy', NOW(), 80.00, 'completed');

INSERT INTO events (id, event_title, description, date, time, venue, created_by, created_at) VALUES
(1, 'AI Workshop', 'An in-depth workshop on AI', '2024-11-15', '09:00:00', 'Room A', 2, NOW()),
(2, 'Machine Learning Seminar', 'Introduction to ML concepts', '2024-11-20', '11:00:00', 'Room B', 4, NOW()),
(3, 'Web Development Bootcamp', 'Learn how to build websites', '2024-12-01', '10:00:00', 'Room C', 6, NOW()),
(4, 'Cloud Computing Conference', 'Discussing the latest in cloud tech', '2024-12-10', '13:00:00', 'Room D', 8, NOW()),
(5, 'Big Data Analytics Symposium', 'Exploring data at scale', '2024-12-20', '15:00:00', 'Room E', 2, NOW()),
(6, 'AI in Healthcare', 'How AI is transforming healthcare', '2024-11-25', '14:00:00', 'Room F', 4, NOW()),
(7, 'Python for Data Science', 'Learn Python for data analytics', '2024-12-05', '16:00:00', 'Room G', 6, NOW()),
(8, 'Deep Learning Applications', 'Discussing practical applications of deep learning', '2024-12-15', '17:00:00', 'Room H', 8, NOW()),
(9, 'Cybersecurity Trends', 'Understanding the future of cybersecurity', '2024-11-18', '18:00:00', 'Room I', 2, NOW()),
(10, 'Blockchain Technology', 'Exploring blockchain and its applications', '2024-12-22', '19:00:00', 'Room J', 4, NOW());

INSERT INTO event_registrations (id, event_id, student_id, registered_at) VALUES
(1, 1, 1, NOW()),
(2, 2, 3, NOW()),
(3, 3, 5, NOW()),
(4, 4, 7, NOW()),
(5, 5, 9, NOW()),
(6, 6, 1, NOW()),
(7, 7, 3, NOW()),
(8, 8, 5, NOW()),
(9, 9, 7, NOW()),
(10, 10, 9, NOW());
INSERT INTO event_registrations (id, event_id, student_id, registered_at) VALUES
(1, 1, 1, NOW()),
(2, 2, 3, NOW()),
(9, 9, 7, NOW()),
(10, 10, 9, NOW());
INSERT INTO appointments (id, student_id, department_name, url, created_at) VALUES
(1, 1, 'Writing Center', 'http://writingcenter.example.com', NOW()),
(2, 3, 'Student Success Center', 'http://successcenter.example.com', NOW()),
(3, 5, 'Parking and Transportation', 'http://parking.example.com', NOW()),
(4, 7, 'Counseling Services', 'http://counseling.example.com', NOW()),
(5, 9, 'IT Help Desk', 'http://ithelp.example.com', NOW()),
(6, 1, 'Career Services', 'http://careerservices.example.com', NOW()),
(7, 3, 'Library Services', 'http://library.example.com', NOW()),
(8, 5, 'Health Services', 'http://health.example.com', NOW()),
(9, 7, 'Financial Aid Office', 'http://financialaid.example.com', NOW()),
(10, 9, 'Admissions Office', 'http://admissions.example.com', NOW());

INSERT INTO posts (id, title, body, user_id, status, created_at) VALUES
(1, 'Understanding AI', 'An introduction to artificial intelligence', 1, 'published', NOW()),
(2, 'Data Structures 101', 'Learn the basics of data structures', 2, 'draft', NOW()),
(3, 'Machine Learning Concepts', 'An overview of machine learning algorithms', 3, 'published', NOW()),
(4, 'Deep Dive into Python', 'Mastering Python for data science', 4, 'draft', NOW()),
(5, 'Cloud Computing Explained', 'A guide to cloud computing technologies', 5, 'published', NOW()),
(6, 'Web Development Tips', 'Best practices for building web applications', 6, 'published', NOW()),
(7, 'Big Data Challenges', 'Exploring challenges in big data', 7, 'draft', NOW()),
(8, 'Blockchain Basics', 'Understanding the fundamentals of blockchain', 8, 'published', NOW()),
(9, 'Cybersecurity Essentials', 'Key principles of cybersecurity', 9, 'draft', NOW()),
(10, 'AI in Healthcare', 'How AI is transforming the healthcare industry', 10, 'published', NOW());

DELIMITER //

CREATE TRIGGER log_enrollment
AFTER INSERT ON enrollments
FOR EACH ROW
BEGIN
  INSERT INTO posts (title, body, user_id, status, created_at)
  VALUES (CONCAT('New Enrollment by ', NEW.student_id), 
          CONCAT('Student ', NEW.student_id, ' enrolled in course ', NEW.course_id), 
          NEW.student_id, 'published', NOW());
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER notify_event_registration
AFTER INSERT ON event_registrations
FOR EACH ROW
BEGIN
  DECLARE creator INT DEFAULT NULL;
  
  SET creator = (SELECT created_by FROM events WHERE id = NEW.event_id);

  INSERT INTO posts (title, body, user_id, status, created_at)
  VALUES (CONCAT('New Registration for Event ', NEW.event_id), 
          CONCAT('Student ', NEW.student_id, ' has registered for your event.'), 
          creator, 'published', NOW());
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER track_book_transaction
AFTER INSERT ON book_transactions
FOR EACH ROW
BEGIN
  INSERT INTO posts (title, body, user_id, status, created_at)
  VALUES (CONCAT('Book Transaction: ', NEW.transaction_type), 
          CONCAT('Student ', NEW.student_id, ' performed a ', NEW.transaction_type, ' on book ID ', NEW.book_id, ' with status ', NEW.status), 
          NEW.student_id, 'published', NOW());
END //

DELIMITER ;

-- Trigger to Enforce Unique Appointments per Student per Department
DELIMITER //

CREATE TRIGGER unique_appointment
BEFORE INSERT ON appointments
FOR EACH ROW
BEGIN
  DECLARE appointment_exists INT;

  SET appointment_exists = (SELECT COUNT(*) FROM appointments 
                            WHERE student_id = NEW.student_id 
                            AND department_name = NEW.department_name);

  IF appointment_exists > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Student already has an appointment with this department.';
  END IF;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER set_course_status_on_faculty_removal
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
  IF OLD.role = 'faculty' AND NEW.role != 'faculty' THEN
    UPDATE courses
    SET faculty_id = NULL
    WHERE faculty_id = OLD.id;
    
    INSERT INTO posts (title, body, user_id, status, created_at)
    VALUES ('Faculty Removed from Course', 
            CONCAT('Faculty ID ', OLD.id, ' removed. Courses are now unassigned.'), 
            NULL, 'published', NOW());
  END IF;
END //

DELIMITER ;






















