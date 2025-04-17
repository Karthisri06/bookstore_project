import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form, Col, Row, Alert } from 'react-bootstrap';

interface Book {
  id: number;
  title: string;
  description: string;
  genre: string;
}

const AuthorDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: '', description: '', genre: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/author/books', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch (err) {
      setError('Error fetching books');
      console.error('Error fetching books:', err);
    }
  };

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/author/books', newBook, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewBook({ title: '', description: '', genre: '' });
      fetchBooks();
      setSuccess('Book published successfully!');
    } catch (err) {
      setError('Error adding book');
      console.error('Error adding book:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-white p-4">
          <h2 className="h4">Author Dashboard</h2>
          <ul className="list-unstyled">
            <li><a href="#" className="text-white">Dashboard</a></li>
            <li><a href="#" className="text-white">My Books</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <h1 className="mb-4">Welcome, Author!</h1>

          {/* Error or Success Messages */}
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {/* List of Books */}
          <div className="mb-4">
            <h2 className="h5">My Books</h2>
            {books.length === 0 ? (
              <p>No books published yet.</p>
            ) : (
              <Row>
                {books.map((book) => (
                  <Col key={book.id} md={4} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>{book.description}</Card.Text>
                        <Card.Text><strong>Genre:</strong> {book.genre}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>

          {/* Publish Book */}
          <div className="border-top pt-4">
            <h2 className="h5 mb-3">Publish a New Book</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter book title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter book genre"
                  value={newBook.genre}
                  onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter book description"
                  value={newBook.description}
                  onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleAddBook}>
                Publish Book
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;



