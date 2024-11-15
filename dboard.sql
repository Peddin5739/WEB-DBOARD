CREATE DATABASE dboard;
USE dboard;

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select* from users;
-- Courses Table
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(255) NOT NULL,
    faculty_id INT,
    semester VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES users(id) 
      ON DELETE SET NULL ON UPDATE CASCADE
);
select * from courses;
-- Enrollments Table
CREATE TABLE enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) 
      ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) 
      ON DELETE CASCADE ON UPDATE CASCADE
);
select * from enrollments;
-- Discussions Table
CREATE TABLE discussions (
    id INT PRIMARY KEY AUTO_INCREMENT,
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

-- Books Table
CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    book_title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    faculty_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES users(id) 
      ON DELETE SET NULL ON UPDATE CASCADE
);
select * from books;
-- Book Transactions Table
CREATE TABLE book_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    student_id INT,
    transaction_type VARCHAR(50) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id) 
      ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) 
      ON DELETE CASCADE ON UPDATE CASCADE
);
select * from book_transactions;
-- Events Table
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
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

-- Event Registrations Table
CREATE TABLE event_registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT,
    student_id INT,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) 
      ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) 
      ON DELETE CASCADE ON UPDATE CASCADE
);

-- Appointments Table
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    department_name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) 
      ON DELETE CASCADE ON UPDATE CASCADE
);

-- Follows Table
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

-- Posts Table
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    user_id INT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) 
      ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample data into users table
INSERT INTO users (username, email, password, role, created_at) VALUES
('john_doe', 'john@example.com', 'password1', 'student', NOW()),
('jane_doe', 'jane@example.com', 'password2', 'faculty', NOW()),
('alice_smith', 'alice@example.com', 'password3', 'student', NOW()),
('bob_jones', 'bob@example.com', 'password4', 'faculty', NOW()),
('charlie_brown', 'charlie@example.com', 'password5', 'student', NOW()),
('david_white', 'david@example.com', 'password6', 'faculty', NOW()),
('eve_black', 'eve@example.com', 'password7', 'student', NOW()),
('frank_red', 'frank@example.com', 'password8', 'faculty', NOW()),
('grace_green', 'grace@example.com', 'password9', 'student', NOW()),
('henry_blue', 'henry@example.com', 'password10', 'faculty', NOW());

-- Insert sample data into courses table
INSERT INTO courses (course_name, faculty_id, semester, created_at) VALUES
('Introduction to Programming', 2, 'Fall 2024', NOW()),
('Data Structures', 4, 'Spring 2024', NOW()),
('Database Systems', 6, 'Fall 2024', NOW()),
('Operating Systems', 8, 'Spring 2024', NOW()),
('Web Development', 2, 'Fall 2024', NOW()),
('Software Engineering', 4, 'Spring 2024', NOW()),
('Artificial Intelligence', 6, 'Fall 2024', NOW()),
('Machine Learning', 8, 'Spring 2024', NOW()),
('Cloud Computing', 2, 'Fall 2024', NOW()),
('Big Data Analytics', 4, 'Spring 2024', NOW());

-- Insert sample data into enrollments table
INSERT INTO enrollments (student_id, course_id, enrolled_at) VALUES
(1, 1, NOW()),
(3, 2, NOW()),
(5, 3, NOW()),
(7, 4, NOW()),
(9, 5, NOW()),
(1, 6, NOW()),
(3, 7, NOW()),
(5, 8, NOW()),
(7, 9, NOW()),
(9, 10, NOW());

-- Insert sample data into discussions table
INSERT INTO discussions (course_id, user_id, message, attachment, created_at) VALUES
(1, 1, 'What are the assignments for next week?', NULL, NOW()),
(2, 3, 'Can someone explain binary trees?', NULL, NOW()),
(3, 5, 'When is the project due?', NULL, NOW()),
(4, 7, 'Any tips on multi-threading?', NULL, NOW()),
(5, 9, 'Is there extra reading material?', NULL, NOW()),
(6, 1, 'Best framework for web development?', NULL, NOW()),
(7, 3, 'Can anyone explain backpropagation?', NULL, NOW()),
(8, 5, 'Is the final exam cumulative?', NULL, NOW()),
(9, 7, 'When is the lab session?', NULL, NOW()),
(10, 9, 'Any guest lectures planned?', NULL, NOW());

-- Insert sample data into books table
INSERT INTO books (book_title, author, faculty_id, created_at) VALUES
('Introduction to Algorithms', 'Thomas H. Cormen', 2, NOW()),
('Clean Code', 'Robert C. Martin', 4, NOW()),
('Database Systems', 'Elmasri & Navathe', 6, NOW()),
('Operating System Concepts', 'Silberschatz et al.', 8, NOW()),
('Artificial Intelligence: A Modern Approach', 'Russell & Norvig', 2, NOW()),
('Python Crash Course', 'Eric Matthes', 4, NOW()),
('Deep Learning', 'Ian Goodfellow', 6, NOW()),
('The Pragmatic Programmer', 'Andrew Hunt & David Thomas', 8, NOW()),
('Data Science from Scratch', 'Joel Grus', 2, NOW()),
('Cloud Computing: Concepts & Technology', 'Thomas Erl', 4, NOW());

select * from books;

-- Insert sample data into book_transactions table
INSERT INTO book_transactions (book_id, student_id, transaction_type, transaction_date, amount, status) VALUES
(1, 1, 'rent', NOW(), 15.00, 'active'),
(2, 3, 'buy', NOW(), 30.00, 'completed'),
(3, 5, 'rent', NOW(), 20.00, 'active'),
(4, 7, 'buy', NOW(), 45.00, 'completed'),
(5, 9, 'sell', NOW(), 25.00, 'completed'),
(6, 1, 'rent', NOW(), 10.00, 'active'),
(7, 3, 'buy', NOW(), 60.00, 'completed'),
(8, 5, 'sell', NOW(), 20.00, 'completed'),
(9, 7, 'rent', NOW(), 15.00, 'active'),
(10, 9, 'buy', NOW(), 50.00, 'completed');
select * from book_transactions;
-- Insert sample data into events table
INSERT INTO events (event_title, description, date, time, venue, created_by, created_at) VALUES
('AI Workshop', 'An in-depth workshop on AI', '2024-11-15', '09:00:00', 'Room A', 2, NOW()),
('Machine Learning Seminar', 'Introduction to ML concepts', '2024-11-20', '11:00:00', 'Room B', 4, NOW()),
('Web Development Bootcamp', 'Learn to build websites', '2024-12-01', '10:00:00', 'Room C', 6, NOW()),
('Cloud Computing Conference', 'Discuss latest in cloud tech', '2024-12-10', '13:00:00', 'Room D', 8, NOW()),
('Big Data Symposium', 'Explore data at scale', '2024-12-20', '15:00:00', 'Room E', 2, NOW()),
('AI in Healthcare', 'AI transforming healthcare', '2024-11-25', '14:00:00', 'Room F', 4, NOW()),
('Python for Data Science', 'Learn Python for analytics', '2024-12-05', '16:00:00', 'Room G', 6, NOW()),
('Deep Learning Applications', 'Practical deep learning', '2024-12-15', '17:00:00', 'Room H', 8, NOW()),
('Cybersecurity Trends', 'Future of cybersecurity', '2024-11-18', '18:00:00', 'Room I', 2, NOW()),
('Blockchain Tech', 'Exploring blockchain uses', '2024-12-22', '19:00:00', 'Room J', 4, NOW());

select * from events;
select * from users;
-- Insert sample data into event_registrations table
INSERT INTO event_registrations (event_id, student_id, registered_at) VALUES
(1, 1, NOW()),
(2, 3, NOW()),
(3, 5, NOW()),
(4, 7, NOW()),
(5, 9, NOW()),
(6, 1, NOW()),
(7, 3, NOW()),
(8, 5, NOW()),
(9, 7, NOW()),
(10, 9, NOW());

-- Insert sample data into appointments table
INSERT INTO appointments (student_id, department_name, url, created_at) VALUES
(1, 'Writing Center', 'http://writingcenter.example.com', NOW()),
(3, 'Student Success Center', 'http://successcenter.example.com', NOW()),
(5, 'Parking and Transportation', 'http://parking.example.com', NOW()),
(7, 'Counseling Services', 'http://counseling.example.com', NOW()),
(9, 'IT Help Desk', 'http://ithelp.example.com', NOW()),
(1, 'Career Services', 'http://careerservices.example.com', NOW()),
(3, 'Library Services', 'http://library.example.com', NOW()),
(5, 'Health Services', 'http://health.example.com', NOW()),
(7, 'Financial Aid Office', 'http://financialaid.example.com', NOW()),
(9, 'Admissions Office', 'http://admissions.example.com', NOW());

-- Insert sample data into follows table
INSERT INTO follows (following_user_id, followed_user_id, created_at) VALUES
(1, 2, NOW()),
(3, 4, NOW()),
(5, 6, NOW()),
(7, 8, NOW()),
(9, 10, NOW()),
(2, 3, NOW()),
(4, 5, NOW()),
(6, 7, NOW()),
(8, 9, NOW()),
(10, 1, NOW());

-- Insert sample data into posts table
INSERT INTO posts (title, body, user_id, status, created_at) VALUES
('Understanding AI', 'Intro to AI concepts', 1, 'published', NOW()),
('Data Structures 101', 'Basics of data structures', 2, 'draft', NOW()),
('Machine Learning Basics', 'Overview of ML algorithms', 3, 'published', NOW()),
('Deep Dive into Python', 'Advanced Python techniques', 4, 'draft', NOW()),
('Cloud Computing Explained', 'Guide to cloud technologies', 5, 'published', NOW()),
('Web Dev Tips', 'Best practices for web dev', 6, 'published', NOW()),
('Big Data Challenges', 'Challenges in big data', 7, 'draft', NOW()),
('Blockchain Basics', 'Understanding blockchain', 8, 'published', NOW()),
('Cybersecurity Essentials', 'Principles of cybersecurity', 9, 'draft', NOW()),
('AI in Healthcare', 'How AI is used in healthcare', 10, 'published', NOW());

-- Update the faculty_id in the courses table to test cascading effects
UPDATE courses SET faculty_id = 10 WHERE faculty_id = 2;

-- Verify that the related records in enrollments, discussions, etc., reflect changes if required
SELECT * FROM courses;
SELECT * FROM enrollments;
SELECT * FROM discussions;


DELIMITER //

CREATE TRIGGER log_discussion_post
AFTER INSERT ON discussions
FOR EACH ROW
BEGIN
    INSERT INTO posts (title, body, user_id, status, created_at)
    VALUES (
        CONCAT('New Discussion in Course ', NEW.course_id),
        CONCAT('User ', NEW.user_id, ' posted: "', NEW.message, '"'),
        NEW.user_id,
        'published',
        NOW()
    );
END //

DELIMITER ;
