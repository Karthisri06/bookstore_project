import React, { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";
import { Button } from "react-bootstrap";
import { useAuth } from "../FormComponents/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';  // Import Trash Icon

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [maybeLater, setMaybeLater] = useState<boolean>(false);
  const navigate = useNavigate();

  // Calculate total price of the cart items
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handlePurchase = () => {
    if (!isAuthenticated && !maybeLater) {
      openAuthModal();
    } else {
      const itemIds = cartItems.map((item) => item.id);
      navigate('/purchase-page', { state: { itemIds } });  // Send all item IDs for purchase
    }
  };

  const handleRemove = (bookId: number) => {
    removeFromCart(bookId);
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.bookName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{item.bookName}</h5>
                      <p className="card-text fw-bold fs-5 text-primary">
                        Price: ₹{item.price}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="danger"
                        onClick={() => handleRemove(item.id)}  // Using the handleRemove function
                      >
                        <FaTrash /> {/* Trash icon for remove */}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <p><strong>Total: ₹{calculateTotal()}</strong></p>
            <Button variant="warning" onClick={clearCart}>
              Clear Cart
            </Button>
            <div className="mt-3">
              <Button variant="success" onClick={handlePurchase}>
                Buy Now
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
