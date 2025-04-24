import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";

interface User {
  id: any;
  userName: string;
  email: string;
  role: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  showModal: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setIsLoggedIn: (value: boolean) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Add this line to define setUser
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Declare setUser here
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const login = (userData: User, token: string) => {
 console.log(userData, 'userData')
    localStorage.setItem("token", token);
    console.log(JSON.stringify(userData), 'user')
    localStorage.setItem('userName', JSON.stringify(userData.userName))
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    closeAuthModal();
    // window.location.reload(); // If you want to reload after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null); // Now setUser is properly defined
  };

  const openAuthModal = () => setShowModal(true);
  const closeAuthModal = () => setShowModal(false);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      showModal,
      login,
      logout,
      setIsLoggedIn: setIsAuthenticated,
      openAuthModal,
      closeAuthModal,
      setUser, // Include setUser in the context value
    }),
    [isAuthenticated, user, showModal]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};











