import { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Book } from "../types";

type CartItem = {
  id: string;
  title: string;
  price: number;
  book: Book;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Add item to the cart
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const updatedCart = [...prev, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });
    toast.success(`${item.title} added to cart!`);
  };

  // Remove item from the cart
  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart
      return updatedCart;
    });
    toast.error('Item removed from cart');
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart"); // Remove from localStorage
    toast.info('Cart cleared!');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

