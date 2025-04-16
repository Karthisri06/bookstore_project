// Cart.tsx
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleRemoveFromCart = (bookId: string) => {
    setCartItems(cartItems.filter(item => item.id !== bookId));
  };

  const handleCheckout = () => {
    // Handle checkout logic
    alert("Proceeding to checkout...");
  };

  return (
    <div>
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
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Button variant="success" onClick={handleCheckout}>Proceed to Checkout</Button>
    </div>
  );
};

export default Cart;
