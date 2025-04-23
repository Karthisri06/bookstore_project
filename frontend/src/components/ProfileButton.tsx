import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../FormComponents/AuthContext';
import profilePic from '../assets/profile.jpg';

const ProfileButton: React.FC = () => {
  const { user } = useAuth(); // Accessing user from AuthContext
  const navigate = useNavigate();
  const location = useLocation();  // Hook to get current path

    const userers = localStorage.getItem('userName') 
    console.log('=======================>',userers)

  const handleRoute = (path: string) => {
    navigate(path);
  };

  const getDashboardLabel = () => {
    if (user?.role === 'admin') return 'Admin Dashboard';
    if (user?.role === 'author') return 'Author Dashboard';
    return 'Dashboard';
  };

  const getDashboardRoute = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin';
      case 'author':
        return '/author';
      default:
        return '/dashboard'; // user
    }
  };

  const handleDashboardClick = () => {
    const dashboardRoute = getDashboardRoute();

    if (location.pathname !== dashboardRoute) {
      handleRoute(dashboardRoute);
    }
  };

  return (
    <div className="dropdown">
      <img
        src={profilePic}
        alt="Profile"
        className="dropdown-toggle rounded-circle border border-secondary shadow-sm"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          width: '40px',
          height: '40px',
          objectFit: 'cover',
          cursor: 'pointer'
        }}
      />
      <ul className="dropdown-menu dropdown-menu-end mt-2">
        
        {/* Display the user's name if available */}
        {userers && (
          <li>
            <span className="dropdown-item text-center">{`Hello, ${userers}`}</span>
          </li>
        )}
        <li>
          <button className="dropdown-item" onClick={() => handleRoute('/')}>
            Home
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleDashboardClick}>
            {getDashboardLabel()}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileButton;


