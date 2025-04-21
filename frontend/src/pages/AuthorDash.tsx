import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form, Col, Row, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  description: string;
  genre: string;
  price: number;
}

const AuthorDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    genre: 'Fiction',  
    price: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();

  const genres = [   
    "fiction",
    "romance",
    "science",
    "fantasy",
    "mystery",
    "biography",
    "history",
    "art",
    "self-help",
    "children",
    "poetry",
    "horror",
    "adventure",
    "comics",
    "travel"];

  const fetchBooks = async () => {
    setIsFetching(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/author');
        return;
      }
      const res = await axios.get('http://localhost:5000/author/my-books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      setError('Error fetching books');
      console.error('Error fetching books:', err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.description || newBook.price <= 0) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/author');
        return;
      }

    
      await axios.post('http://localhost:5000/author/publish', newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewBook({ title: '', description: '', genre: 'Fiction', price: 0 });
      fetchBooks(); 
      setSuccess('Book published successfully!');
    } catch (err) {
      setError('Error adding book');
      console.error('Error adding book:', err);
    } finally {
      setIsLoading(false);
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
            {isFetching ? (
              <Spinner animation="border" variant="primary" />
            ) : books.length === 0 ? (
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
                        <Card.Text><strong>Price:</strong> ${book.price}</Card.Text>
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
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter book description"
                  value={newBook.description}
                  onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter book price"
                  value={newBook.price}
                  onChange={(e) => setNewBook({ ...newBook, price: parseFloat(e.target.value) })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  as="select"
                  value={newBook.genre}
                  onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                >
                  {genres.map((genre, index) => (
                    <option key={index} value={genre}>{genre}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" onClick={handleAddBook} disabled={isLoading}>
                {isLoading ? 'Publishing...' : 'Publish Book'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;







