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
  imageUrl: string;
}

const AuthorDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    genre: 'Fiction',
    price: 0,
    imageUrl: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('Home'); // NEW
  const navigate = useNavigate();

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi'];

  const fetchBooks = async () => {
    setIsFetching(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      const userName = localStorage.getItem('userName');
      console.log(`${userName}`, '1234567890-098765432');
      const res = await axios.get(`http://localhost:5000/author/my-books/${userName}`,
         {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
      setBooks(res.data);
    } catch (err) {
      setError('Error fetching books');
      console.error('Error fetching books:111111111111111', err);
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
        navigate('/login');
        return;
      }
      const userName = localStorage.getItem('userName');

      await axios.post(`http://localhost:5000/author/publish/${userName}`, newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewBook({ title: '', description: '', genre: 'Fiction', price: 0, imageUrl: '' });
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
            {['Home', 'My Books', 'Reviews', 'Notifications'].map((section) => (
              <li key={section}>
                <button
                  className={`btn btn-link text-white text-start w-100 ${activeSection === section ? 'fw-bold' : ''}`}
                  onClick={() => setActiveSection(section)}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {activeSection === 'Home' && (
            <>
              <h1 className="mb-4">Welcome, Author!</h1>
              <p>This is your author dashboard. Use the sidebar to manage your books, reviews, and notifications.</p>
            </>
          )}

          {activeSection === 'My Books' && (
            <>
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
                          {book.imageUrl && (
                            <Card.Img variant="top" src={book.imageUrl} style={{ height: '200px', objectFit: 'cover' }} />
                          )}
                          <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>{book.description}</Card.Text>
                            <Card.Text><strong>Genre:</strong> {book.genre}</Card.Text>
                            <Card.Text><strong>Price:</strong> ₹{book.price}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </div>

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

                  <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter image URL"
                      value={newBook.imageUrl}
                      onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })}
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={handleAddBook} disabled={isLoading}>
                    {isLoading ? 'Publishing...' : 'Publish Book'}
                  </Button>
                </Form>
              </div>
            </>
          )}

          {activeSection === 'Reviews' && (
            <div>
              <h2>Reviews</h2>
              <p>Here you can manage and respond to book reviews.</p>
            </div>
          )}

          {activeSection === 'Notifications' && (
            <div>
              <h2>Notifications</h2>
              <p>Here you'll see notifications like review updates or book approvals.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;

