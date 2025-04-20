
import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../services/AuthContext';

const AdminDash = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [unassignedBooks, setUnassignedBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      return; 
    }

    axios.get("http://localhost:5000/books")
      .then(res => {
        const allBooks = res.data;
        setBooks(allBooks);
        const unassigned = allBooks.filter((book: any) => !book.author);
        setUnassignedBooks(unassigned);
      })
      .catch(() => {
        setError("Failed to load books.");
      });
  }, [isAuthenticated, user]);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Admin Dashboard</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row xs={1} md={2} lg={3} className="g-4">
        <Col>
          <Card
            className="h-100 text-center hover-shadow"
            onClick={() => handleCardClick('/admin/overview')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body>
              <Card.Title>📚 Total Books</Card.Title>
              <Card.Text>{books.length} books available</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card
            className="h-100 text-center hover-shadow"
            onClick={() => handleCardClick('/admin/unassigned')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body>
              <Card.Title>❌ Unassigned Books</Card.Title>
              <Card.Text>{unassignedBooks.length} books without authors</Card.Text>
              useNavigate("/unassigned");
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card
            className="h-100 text-center hover-shadow"
            onClick={() => handleCardClick('/admin/notifications')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body>
              <Card.Title>🔔 Notifications</Card.Title>
              <Card.Text>3 pending approvals</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card
            className="h-100 text-center bg-success text-white hover-shadow"
            onClick={() => handleCardClick('/admin/add')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body>
              <Card.Title>➕ Add Book / Author</Card.Title>
              <Card.Text>Manage new books and authors</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDash;







