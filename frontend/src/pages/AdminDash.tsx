// AdminDash.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Alert, Container } from 'react-bootstrap';
import { useAuth } from "../services/AuthContext";  // Importing AuthContext to get current user role
import { useNavigate } from 'react-router-dom';

interface Book {
  id: string;
  title: string;
  genre: { name: string };
  author?: string;
}

const AdminDash = () => {
  const { isAuthenticated, user } = useAuth();  // Get authentication state
  const [books, setBooks] = useState<Book[]>([]);
  const [authorEmails, setAuthorEmails] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();  // For navigation

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/");  // Redirect to home if not an admin
    } else {
      // Fetch books for admins if they are logged in
      axios.get('/books')
        .then((response) => {
          setBooks(response.data);
        })
        .catch(() => {
          setErrorMessage("Error fetching books.");
        });
    }
  }, [isAuthenticated, user, navigate]);  // Dependency array includes user and isAuthenticated

  const handleAssignAuthor = (bookId: string) => {
    const email = authorEmails[bookId];
    if (!email) {
      setErrorMessage("Please enter an author email.");
      return;
    }

    axios.post(`/books/${bookId}/assign-author`, { email })
      .then(() => {
        setSuccessMessage("Author assigned successfully.");
        setErrorMessage("");
        setBooks(prevBooks =>
          prevBooks.map(book =>
            book.id === bookId ? { ...book, author: email } : book
          )
        );
      })
      .catch(() => {
        setErrorMessage("Failed to assign author.");
        setSuccessMessage("");
      });
  };

  const handleInputChange = (bookId: string, value: string) => {
    setAuthorEmails(prev => ({ ...prev, [bookId]: value }));
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Admin Dashboard</h1>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Author</th>
            <th>Assign Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.genre.name}</td>
              <td>{book.author || "Unassigned"}</td>
              <td>
                {!book.author && (
                  <>
                    <Form.Control
                      type="email"
                      placeholder="Author email"
                      className="mb-2"
                      value={authorEmails[book.id] || ""}
                      onChange={(e) => handleInputChange(book.id, e.target.value)}
                    />
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAssignAuthor(book.id)}
                    >
                      Assign
                    </Button>
                  </>
                )}
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="warning" size="sm">Edit</Button>
                  <Button variant="danger" size="sm">Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDash;




