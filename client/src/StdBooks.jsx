import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./StdBooks.css";

export default function StdBooks() {
  const user = useSelector((state) => state.user || {});
  const { userData = {} } = user;
  const { id: studentId } = userData;

  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch books based on enrolled courses for the student
  useEffect(() => {
    if (studentId) {
      fetch(`http://localhost:8080/enrolled-books/${studentId}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch books");
          return response.json();
        })
        .then((data) => {
          const booksWithStatus = data.map((book) => ({
            ...book,
            transactionAvailable: null,
          }));

          // For each book, check the transaction status
          booksWithStatus.forEach((book, index) => {
            fetch(
              `http://localhost:8080/check-transaction/${book.book_id}/${studentId}`
            )
              .then((response) => response.json())
              .then((transactionData) => {
                if (transactionData.message === "Transaction not available") {
                  booksWithStatus[index].transactionAvailable = false;
                } else {
                  booksWithStatus[index].transactionAvailable = true;
                  booksWithStatus[index].transactionType =
                    transactionData.transaction_type;
                  booksWithStatus[index].status = transactionData.status;
                }
                setBooks([...booksWithStatus]); // Update books with transaction status
              })
              .catch((error) =>
                console.error("Error checking transaction:", error)
              );
          });
        })
        .catch((error) => setError(error.message));
    }
  }, [studentId]);

  const handleTransaction = (bookId, type) => {
    fetch("http://localhost:8080/book-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        book_id: bookId,
        student_id: studentId,
        transaction_type: type,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccessMessage(data.message);
          setBooks((prevBooks) =>
            prevBooks.map((book) =>
              book.book_id === bookId
                ? {
                    ...book,
                    transactionAvailable: true,
                    transactionType: type,
                    status: "active",
                  }
                : book
            )
          );
        } else {
          setError("Failed to complete transaction");
        }
      })
      .catch((error) => setError("Transaction error"));
  };

  return (
    <div className="std-books-container">
      <h1>My Books</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.book_id} className="book-card">
              <h3 className="book-title">{book.book_title}</h3>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Faculty:</strong> {book.faculty_name}
              </p>
              <p>
                <strong>Added on:</strong>{" "}
                {new Date(book.created_at).toLocaleDateString()}
              </p>
              {book.transactionAvailable === false ? (
                <div className="actions">
                  <button
                    onClick={() => handleTransaction(book.book_id, "rent")}
                  >
                    Rent - $20.00
                  </button>
                  <button
                    onClick={() => handleTransaction(book.book_id, "buy")}
                  >
                    Buy - $50.00
                  </button>
                  <p className="status not-active">Status: Not active</p>
                </div>
              ) : book.transactionAvailable === true ? (
                <div>
                  <p>
                    <strong>Transaction Type:</strong> {book.transactionType}
                  </p>
                  <p
                    className={`status ${
                      book.status === "active" ? "active" : "not-active"
                    }`}
                  >
                    Status: {book.status === "active" ? "Active" : "Not active"}
                  </p>
                </div>
              ) : (
                <p>Checking transaction...</p>
              )}
            </div>
          ))
        ) : (
          <p>No books found for your enrolled courses.</p>
        )}
      </div>
    </div>
  );
}
