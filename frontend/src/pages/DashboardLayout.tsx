import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useAuth } from '../FormComponents/AuthContext';
import { Link } from 'react-router-dom';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const commonLinks = [
    { label: 'Home', path: '/' },
    { label: 'Notifications', path: '/notifications' },
    { label: 'Logout', path: '/logout' }
  ];

  const roleLinks =
    user?.role === 'admin'
      ? [
          { label: 'Unassigned Books', path: '/admin/unassigned' },
          { label: 'Orders', path: '/admin/orders' }
        ]
      : user?.role === 'author'
      ? [
          { label: 'My Books', path: '/author/books' },
          { label: 'Publish New Book', path: '/author/publish' }
        ]
      : [];

  return (
    <Row className="m-0">
      <Col md={3} className="bg-dark text-white p-4 min-vh-100">
        <h4>{user?.role?.toUpperCase()} Dashboard</h4>
        <ul className="list-unstyled mt-4">
          {[...roleLinks, ...commonLinks].map((item, idx) => (
            <li key={idx} className="mb-2">
              <Link to={item.path} className="text-white text-decoration-none">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Col>

      <Col md={9} className="p-4">
        {children}
      </Col>
    </Row>
  );
};

export default DashboardLayout;
