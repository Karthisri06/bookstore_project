import { useCart } from '../services/CartContext';
import { Button, Table } from 'react-bootstrap';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    clearCart();
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
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
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

