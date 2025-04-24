import React, { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";
import { Button } from "react-bootstrap";
import { useAuth } from "../FormComponents/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
    const { isAuthenticated, setIsLoggedIn, openAuthModal, closeAuthModal, showModal } = useAuth();  
     const [maybeLater, setMaybeLater] = useState<boolean>(false);
  const navigate = useNavigate();

  console.log('cardItem',cartItems)
  
 
  const handlePurchase = (bookId: number) => {
    console.log("---------->",bookId)
    if (!isAuthenticated && !maybeLater) {
      openAuthModal();
    } else {
      navigate('/purchase-page', { state: { bookId } });
    }
  };
  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {void console.log(cartItems, 'test1234')}
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
                      {/* <p className="card-text text-muted">{item.description}</p> */}
                      <p className="card-text fw-bold fs-5 text-primary">
                        Price: ₹{item.price}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="danger"
                        onClick={() => {
                          console.log(item.id, "id test");
                          removeFromCart(item.id);
                        }}
                      >
                        Remove
                      </Button>
                      <button
                      className="btn btn-sm btn-success"
                      onClick={() => handlePurchase(item.id)}
                    >
                      Buy Now
                    </button>


                    </div>
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
