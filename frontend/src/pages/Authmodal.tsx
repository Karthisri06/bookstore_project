import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AuthModalProps {
  show: boolean;
  handleClose: () => void;
  handleLogin: (email: string, password: string) => void;
  handleSignup: (email: string, password: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  show,
  handleClose,
  handleLogin,
  handleSignup,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(email, password);
    } else {
      handleSignup(email, password);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? "Login" : "Sign Up"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

          <Button variant="primary" type="submit">
            {isLogin ? "Login" : "Sign Up"}
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




