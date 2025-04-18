import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  element: JSX.Element;
  isAdmin?: boolean;
}

const PrivateRoute: React.FC<Props> = ({ element, isAdmin }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/admin" />;
  }

  return element;
};

export default PrivateRoute;



