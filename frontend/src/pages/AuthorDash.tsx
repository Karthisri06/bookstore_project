// AuthorDashboard.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';

const AuthorDashboard = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch books from API
    axios.get('/books/author') // Adjust this route as necessary
      .then((response) => {
        setBooks(response.data);
      })
      .catch(() => {
        setErrorMessage("Error fetching books.");
      });
  }, []);

  const handleEdit = (bookId: string) => {
    // Handle the book editing logic
    console.log("Editing book with ID:", bookId);
  };

  const handleDelete = (bookId: string) => {
    // Handle the book deletion logic
    axios.delete(`books/${bookId}`)
      .then(() => {
        setSuccessMessage("Book deleted successfully.");
        setBooks(books.filter(book => book.id !== bookId)); // Remove the deleted book from the list
      })
      .catch(() => {
        setErrorMessage("Failed to delete book.");
      });
  };

  return (
    <div>
      <h1>Author Dashboard</h1>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.genre.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(book.id)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AuthorDashboard;

