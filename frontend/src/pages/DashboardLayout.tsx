import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useAuth } from '../FormComponents/AuthContext';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const commonLinks = [
    { label: 'Home', tab: 'home' },
    { label: 'My Orders', tab: 'orders' },
    { label: 'My Reviews', tab: 'reviews' },
    { label: 'Notifications', tab: 'notifications' },
  ];

  const roleLinks =
    user?.role === 'admin'
      ? [
          { label: 'Unassigned Books', tab: 'unassigned' },
          { label: 'Admin Orders', tab: 'admin-orders' },
        ]
      : user?.role === 'author'
      ? [
          { label: 'My Books', tab: 'my-books' },
          { label: 'Publish New Book', tab: 'publish-book' },
        ]
      : [];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <h2>Welcome to your dashboard, {user?.name}!</h2>;
      case 'orders':
        return <h2>Your Orders</h2>;
      case 'reviews':
        return <h2>Your Reviews</h2>;
      case 'notifications':
        return <h2>Your Notifications</h2>;
      case 'unassigned':
        return <h2>Unassigned Books (Admin)</h2>;
      case 'admin-orders':
        return <h2>All Orders (Admin)</h2>;
      case 'my-books':
        return <h2>My Published Books (Author)</h2>;
      case 'publish-book':
        return <h2>Publish a New Book (Author)</h2>;
      default:
        return <h2>Welcome to your dashboard, {user?.name}!</h2>;
    }
  };

  return (
    <Row className="m-0">
      <Col md={3} className="bg-dark text-white p-4 min-vh-100">
        <h4 className="mb-4">{user?.role?.toUpperCase()} Dashboard</h4>

        <ul className="list-unstyled">
          {[...commonLinks, ...roleLinks].map((item, idx) => (
            <li
              key={idx}
              className={`mb-3 cursor-pointer ${activeTab === item.tab ? 'fw-bold text-primary' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleTabClick(item.tab)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </Col>

      <Col md={9} className="p-4">
        {renderContent()}
      </Col>
    </Row>
  );
};

export default DashboardLayout;




// import React, { useState } from 'react';
// import { Col, Row, Nav, Tab } from 'react-bootstrap';
// import { useAuth } from '../FormComponents/AuthContext';

// const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { user } = useAuth();
  
//   // State to manage selected tab
//   const [activeKey, setActiveKey] = useState('home');

//   // Common links for all users
//   const commonLinks = [
//     { label: 'Home', key: 'home' },
//     { label: 'Notifications', key: 'notifications' },
//     { label: 'Profile', key: 'profile' },
//     { label: 'My Orders', key: 'orders' },
//     { label: 'My Reviews', key: 'reviews' },
//   ];

//   // Role-specific links
//   const roleLinks =
//     user?.role === 'admin'
//       ? [
//           { label: 'Unassigned Books', key: 'admin-unassigned' },
//           { label: 'Orders', key: 'admin-orders' }
//         ]
//       : user?.role === 'author'
//       ? [
//           { label: 'My Books', key: 'author-books' },
//           { label: 'Publish New Book', key: 'author-publish' }
//         ]
//       : [];

//   return (
//     <Row className="m-0">
//       <Col md={3} className="bg-dark text-white p-4 min-vh-100">
//         <h4>{user?.role?.toUpperCase()} Dashboard</h4>
//         <Tab.Container id="left-tabs" activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
//           <Nav variant="pills" className="flex-column">
//             {[...roleLinks, ...commonLinks].map((item, idx) => (
//               <Nav.Item key={idx}>
//                 <Nav.Link eventKey={item.key} className="text-white">
//                   {item.label}
//                 </Nav.Link>
//               </Nav.Item>
//             ))}
//           </Nav>
//         </Tab.Container>
//       </Col>

//       <Col md={9} className="p-4">
//         <Tab.Content>
//           <Tab.Pane eventKey="home">
//             <h2>Home Content</h2>
//             {/* Replace with your actual home content */}
//           </Tab.Pane>
//           <Tab.Pane eventKey="notifications">
//             <h2>Notifications Content</h2>
//             {/* Replace with your actual notifications content */}
//           </Tab.Pane>
//           <Tab.Pane eventKey="profile">
//             <h2>Profile Content</h2>
//             {/* Replace with your actual profile content */}
//           </Tab.Pane>
//           <Tab.Pane eventKey="orders">
//             <h2>My Orders Content</h2>
//             {/* Replace with your actual orders content */}
//           </Tab.Pane>
//           <Tab.Pane eventKey="reviews">
//             <h2>My Reviews Content</h2>
//             {/* Replace with your actual reviews content */}
//           </Tab.Pane>
//           <Tab.Pane eventKey="admin-unassigned">
//             <h2>Unassigned Books</h2>
//             {/* Replace with actual admin content */}
//           </Tab.Pane>
//           <Tab.Pane eventKey="admin-orders">
//             <h2>Admin Orders</h2>
//             {/* Replace with actual admin orders content */}
//           </Tab.Pane>
//           <Tab.Pane eventKey="author-books">
//             <h2>My Books</h2>
//             {/* Replace with actual author books content */}
//           </Tab.Pane>
//           <Tab.Pane eventKey="author-publish">
//             <h2>Publish New Book</h2>
//             {/* Replace with actual content for authors */}
//           </Tab.Pane>
//         </Tab.Content>
//       </Col>
//     </Row>
//   );
// };

// export default DashboardLayout;

