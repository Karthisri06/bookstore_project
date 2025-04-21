
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  element: JSX.Element;
  isAdmin?: boolean;
  isAuthor?: boolean;
}

const PrivateRoute: React.FC<Props> = ({ element, isAdmin, isAuthor }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/" />;
  }

  if (isAdmin && user.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  if (isAuthor && user.role === 'author') {
    return <Navigate to="/author" />;
  }

  return element;
};

export default PrivateRoute;

