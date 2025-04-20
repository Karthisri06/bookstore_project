

import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
// import { login } from "../services/authService";

type AuthModalProps ={
  show: boolean;
  handleClose: () => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignup: (email: string, password: string) => Promise<void>;
  onMaybeLater: () => void;

}

const AuthModal: React.FC<AuthModalProps> = ({
  show,
  handleClose,
  handleLogin, 
  handleSignup
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); 
    setLoading(true);

    try {
      if (isLogin) {
        await handleLogin(email, password);  
        handleClose(); 
      }else {
        await handleSignup(email, password); 
        setIsLogin(true); 
      }
    } catch (error) {
      let message = "Something went wrong.";
      if (error instanceof Error) {
        message = error.message;
      }
      setErrorMessage(message);
  console.log(errorMessage);
    
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? "Login" : "Sign Up"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} 
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Maybe Later
        </Button>
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need to Sign Up?" : "Already have an account?"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;







