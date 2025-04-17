import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";

interface User {
  email: string;
  role: string;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // On app load, check if user and token exist in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Login function stores token and user
  const login = (userData: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    window.location.reload();
    closeAuthModal();
  };

  // Logout clears everything
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

const openAuthModal = () => setShowModal(true);
  const closeAuthModal = () => setShowModal(false);

  // Memoize the value to prevent unnecessary re-renders
  const value: AuthContextType = useMemo(
    () => ({
      isAuthenticated,
      user,
      showModal,
      login,
      logout,
      setIsLoggedIn: setIsAuthenticated,
      openAuthModal,
      closeAuthModal,
    }),
    [isAuthenticated, user, showModal]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};










