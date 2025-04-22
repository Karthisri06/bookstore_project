import React from "react";
import { useCart } from '../services/CartContext';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    toast("Proceeding to checkout...");
    clearCart(); 
  };

  const handleBuyNow = (itemTitle: string) => {
    toast(`Buying "${itemTitle}"...`);
    // You can later redirect to a payment page or trigger a modal
  };

  return (
    <div className="container mt-4">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems
            .filter(item => item.title&& item.price)
            .map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>₹{item.price}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(item.id)}
                    className="me-2"
                  >
                    Remove
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleBuyNow(item.title)}
                  >
                    Buy Now
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {cartItems.length > 0 && (
        <Button variant="success" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
};

export default Cart;
