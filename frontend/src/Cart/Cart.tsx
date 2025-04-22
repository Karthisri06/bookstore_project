import React from "react";
import { useCart } from "../Cart/CartContext";
import { Button } from "react-bootstrap";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

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
                  <div className="card-body">
                    <h5 className="card-title">{item.bookName}</h5>
                    <p className="card-text text-muted">{item.description}</p>
                    <p className="card-text fw-bold">Price: ₹{item.price}</p>
                    <Button
                      variant="danger"
                      onClick={() => {
                        console.log(item.id, "id test");
                        removeFromCart(item.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button variant="warning" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
