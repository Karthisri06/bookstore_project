import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Alert, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../FormComponents/AuthContext';
import DashboardLayout from './DashboardLayout';

const AdminDash = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");



  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") return;

    axios.get("http://localhost:5000/books")
      .then(res => {
        setBooks(res.data);
      })
      .catch(() => setError("Failed to load books."));
  }, [isAuthenticated, user]);

  const handleCardClick = (path: string) => navigate(path);

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-light p-3">
          <h4>Admin Dashboard</h4>
          <Nav defaultActiveKey="/admin/dashboard" className="flex-column">
            <Nav.Link onClick={() => handleCardClick('/admin/dashboard')}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => handleCardClick('/admin/orders')}>Orders</Nav.Link>
            <Nav.Link onClick={() => handleCardClick('/admin/notifications')}>Notifications</Nav.Link>
            {/* Add more sidebar links here */}
          </Nav>
        </Col>

        {/* Content Area */}
        <Col md={9}>
          <h1 className="mb-4">Welcome, Admin!</h1>
          {error && <Alert variant="danger">{error}</Alert>}

          <Row className="mb-4">
            <Col md={4}>
              <Card onClick={() => handleCardClick('/')} style={{ cursor: 'pointer' }}>
                <Card.Body><Card.Title>Home</Card.Title></Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card onClick={() => handleCardClick('/admin/orders')} style={{ cursor: 'pointer' }}>
                <Card.Body><Card.Title>Orders</Card.Title></Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card onClick={() => handleCardClick('/admin/notifications')} style={{ cursor: 'pointer' }}>
                <Card.Body><Card.Title>Notifications</Card.Title></Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDash;

