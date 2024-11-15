import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ManageBooks.css";

export default function Manage_books() {
  const user = useSelector((state) => state.user || {});
  const { userData = {}, isAuthenticated, errorMessage } = user;
  const { id: facultyId, role, username } = userData;

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ book_title: "", author: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch books on component mount
  useEffect(() => {
    if (facultyId) {
      fetch(`http://localhost:8080/books/${facultyId}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch books");
          return response.json();
        })
        .then((data) => setBooks(data))
        .catch((error) => setError(error.message));
    }
  }, [facultyId]);

  // Handle input change for new book form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // Add a new book
  const addBook = (e) => {
    e.preventDefault();
    if (!newBook.book_title || !newBook.author) {
      setError("Please fill in all fields");
      return;
    }

    fetch("http://localhost:8080/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newBook, faculty_id: facultyId }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add book");
        return response.json();
      })
      .then((data) => {
        setSuccessMessage("Book added successfully");
        setBooks([
          ...books,
          { ...newBook, id: data.bookId, created_at: new Date().toISOString() },
        ]);
        setNewBook({ book_title: "", author: "" }); // Reset form
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="manage-books-container">
      <h1>Manage Books</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="books-list">
        <h3>Your Books</h3>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-item">
              {" "}
              {/* Added key here */}
              <h4>{book.book_title}</h4>
              <p>Author: {book.author}</p>
              <p>Added on: {new Date(book.created_at).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>

      <div className="add-book-form">
        <h3>Add a New Book</h3>
        <form onSubmit={addBook}>
          <label>
            Book Title:
            <input
              type="text"
              name="book_title"
              value={newBook.book_title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
}
