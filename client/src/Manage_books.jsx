import React, { useEffect, useState } from "react";
import "./ManageBooks.css";

export default function ManageBooks() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    book_id: null,
    student_id: null,
    transaction_type: "",
    amount: "",
    status: "",
  });

  const transactionsPerPage = 5;

  // Fetch transactions from server with pagination
  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/book-transactions`);
      const data = await response.json();
      setTransactions(data);
      setTotalPages(Math.ceil(data.length / transactionsPerPage));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle edit
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction.id);
    setFormData({
      book_id: transaction.book_id,
      student_id: transaction.student_id,
      transaction_type: transaction.transaction_type,
      amount: transaction.amount,
      status: transaction.status,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = async (transactionId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/book-transactions/${transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Update the specific transaction in the state instead of re-fetching all transactions
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, ...formData }
              : transaction
          )
        );
        setEditingTransaction(null); // Exit edit mode
      } else {
        console.error("Error updating transaction");
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  // Get current page transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <div className="manage-books">
      <h2>Manage Book Transactions</h2>
      <div className="transactions">
        {currentTransactions.map((transaction) => (
          <div key={transaction.id} className="transaction-card">
            <div className="transaction-info">
              <p>
                <strong>Book ID:</strong> {transaction.book_id}
              </p>
              <p>
                <strong>Student ID:</strong> {transaction.student_id}
              </p>
              <p>
                <strong>Transaction Type:</strong>{" "}
                {editingTransaction === transaction.id ? (
                  <input
                    type="text"
                    name="transaction_type"
                    value={formData.transaction_type}
                    onChange={handleInputChange}
                  />
                ) : (
                  transaction.transaction_type
                )}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                {editingTransaction === transaction.id ? (
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                ) : (
                  transaction.amount
                )}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {editingTransaction === transaction.id ? (
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  />
                ) : (
                  transaction.status
                )}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(transaction.transaction_date).toLocaleDateString()}
              </p>
            </div>
            {editingTransaction === transaction.id ? (
              <button
                className="save-button"
                onClick={() => handleSaveClick(transaction.id)}
              >
                Save
              </button>
            ) : (
              <button
                className="edit-button"
                onClick={() => handleEditClick(transaction)}
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
