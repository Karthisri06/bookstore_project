
import React, { createContext, useContext, useState } from 'react';
import AuthModal from '../pages/Authmodal';

type AuthContextType = {
  openAuthModal: () => void;
  closeAuthModal: () => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignup: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async (email: string, _password: string): Promise<void> => {
    try {
      // call your backend login logic here
      console.log("Logged in:", email);
      setShowModal(false);
    } catch (err) {
      throw new Error("Login failed");
    }
  };

  const handleSignup = async (email: string, _password: string): Promise<void> => {
    try {
      // call your backend signup logic here
      console.log("Signed up:", email);
      setShowModal(false);
    } catch (err) {
      throw new Error("Signup failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        openAuthModal: () => setShowModal(true),
        closeAuthModal: () => setShowModal(false),
        handleLogin,
        handleSignup
      }}
    >
      {children}
      <AuthModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
      />
    </AuthContext.Provider>
  );
};
