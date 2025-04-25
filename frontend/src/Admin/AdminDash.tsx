import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Alert, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../FormComponents/AuthContext';

const AdminDash = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") return;

    axios.get("http://localhost:5000/books")
      .then(res => setBooks(res.data))
      .catch(() => setError("Failed to load books."));
  }, [isAuthenticated, user]);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const fetchAllUser =async ()=>{
   const data= await axios.get("http://localhost:5000/auth/alluser",{
    headers: { Authorization: `Bearer ${token}` },
    })
    console.log(data.data, 'aertyujhgfhghg')
  }
    fetchAllUser()
  })
  const handleCardClick = (path: string) => navigate(path);

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-white shadow-sm p-4 rounded-start">
          <h4 className="text-primary mb-4">Admin Panel</h4>
          <Nav defaultActiveKey="/admin/dashboard" className="flex-column">
            <Nav.Link className="mb-2" onClick={() => handleCardClick('/admin/dashboard')}>Dashboard</Nav.Link>
            <Nav.Link className="mb-2" onClick={() => handleCardClick('/admin/orders')}>Orders</Nav.Link>
            {/* <Nav.Link className="mb-2" onClick={() => handleCardClick('/admin/notifications')}>Notifications</Nav.Link> */}
            <Nav.Link className="mb-2" onClick={() => handleCardClick('/admin/users')}>Manage Users</Nav.Link>
            <Nav.Link className="mb-2" onClick={() => handleCardClick('/admin/books')}>Manage Books</Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <h2 className="fw-bold text-dark mb-4">Welcome back, Admin!</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="shadow-sm border-0" onClick={() => handleCardClick('/admin/users')} style={{ cursor: 'pointer' }}>
                <Card.Body className="text-center">
                  <Card.Title className="text-primary">Manage Users</Card.Title>
                  <Card.Text>Control user roles and permissions.</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="shadow-sm border-0" onClick={() => handleCardClick('/admin/books')} style={{ cursor: 'pointer' }}>
                <Card.Body className="text-center">
                  <Card.Title className="text-success">Manage Books</Card.Title>
                  <Card.Text>Add, update or delete books.</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="shadow-sm border-0" onClick={() => handleCardClick('/admin/orders')} style={{ cursor: 'pointer' }}>
                <Card.Body className="text-center">
                  <Card.Title className="text-warning">Orders</Card.Title>
                  <Card.Text>Track and manage orders.</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* <Col md={6} lg={4}>
              <Card className="shadow-sm border-0" onClick={() => handleCardClick('/admin/notifications')} style={{ cursor: 'pointer' }}>
                <Card.Body className="text-center">
                  <Card.Title className="text-danger">Notifications</Card.Title>
                  <Card.Text>Send and review alerts.</Card.Text>
                </Card.Body>
              </Card>
            </Col> */}

            <Col md={6} lg={4}>
              <Card className="shadow-sm border-0" onClick={() => handleCardClick('/')} style={{ cursor: 'pointer' }}>
                <Card.Body className="text-center">
                  <Card.Title className="text-secondary">Home</Card.Title>
                  <Card.Text>Back to the bookstore homepage.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDash;