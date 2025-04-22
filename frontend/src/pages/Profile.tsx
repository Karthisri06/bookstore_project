import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../services/AuthContext";

const Profile: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name?: string; email?: string; role?: string } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      axios.get("/api/user/profile") // Replace with your actual API endpoint
        .then(response => setUser(response.data))
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.name}!</h2>
      <p>Email: {user?.email}</p>
      <p>Role: <strong>{user?.role}</strong></p>
      
      {user?.role === "author" && <p>You can publish and edit books.</p>}
      {user?.role === "admin" && <p>Manage users, books, and orders.</p>}
      {user?.role === "user" && <p>Browse books and make purchases.</p>}
    </div>
  );
};

export default Profile;
