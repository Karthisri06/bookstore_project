import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../FormComponents/AuthContext';
import profilePic from '../assets/profile.jpg';

const ProfileButton: React.FC = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation(); 

    const userers = localStorage.getItem('userName') 
    console.log('=======================>',userers)

  const handleRoute = (path: string) => {
    navigate(path);
  };
  const getDashboardRoute = () => {
    if (!user?.role) {
      const localUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (localUser.role === 'admin') return '/admin';
      if (localUser.role === 'author') return '/author';
      return '/dashboard';
    }
  
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'author':
        return '/author';
      default:
        return '/dashboard';
    }
  };
  

  // const handleDashboardClick = () => {
  //   const dashboardRoute = getDashboardRoute();

  //   if (location.pathname !== dashboardRoute) {
  //     handleRoute(dashboardRoute);
  //   }
  // };

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
          {/* <button className="dropdown-item" onClick={handleDashboardClick}>
            {getDashboardRoute()}
          </button> */}
        </li>
      </ul>
    </div>
  );
};

export default ProfileButton;


