import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../FormComponents/AuthContext';

const AdminDash = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [unassignedBooks, setUnassignedBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") return;

    axios.get("http://localhost:5000/books")
      .then(res => {
        const allBooks = res.data;
        setBooks(allBooks);
        const unassigned = allBooks.filter((book: any) => !book.author);
        setUnassignedBooks(unassigned);
      })
      .catch(() => setError("Failed to load books."));
  }, [isAuthenticated, user]);

  const handleCardClick = (path: string) => navigate(path);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4 mb-4">
        <Col><Card onClick={() => handleCardClick('/admin/home')} style={{ cursor: 'pointer' }}><Card.Body><Card.Title>Home</Card.Title></Card.Body></Card></Col>
        <Col><Card onClick={() => handleCardClick('/admin/orders')} style={{ cursor: 'pointer' }}><Card.Body><Card.Title>Orders</Card.Title></Card.Body></Card></Col>
        <Col><Card onClick={() => handleCardClick('/admin/notifications')} style={{ cursor: 'pointer' }}><Card.Body><Card.Title>Notifications</Card.Title></Card.Body></Card></Col>
        <Col><Card onClick={() => handleCardClick('/admin/unassigned')} style={{ cursor: 'pointer' }}><Card.Body><Card.Title>Unassigned Books</Card.Title><Card.Text>{unassignedBooks.length} books without authors</Card.Text></Card.Body></Card></Col>
      </Row>
    </Container>
  );
};

export default AdminDash;