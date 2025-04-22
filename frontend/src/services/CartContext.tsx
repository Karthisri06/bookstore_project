import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import { Book } from "../types";
import { CartItem} from "../types";

// type CartItem = {
//   id: number;
//   title: string;
//   price: number;
//   book:Book;

// };

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

 
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = 1; 
        const response = await axios.get(`http://localhost:5000/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        toast.error("Failed to fetch cart items");
      }
    };

    fetchCartItems();
  }, []);

  const addToCart = async (item: CartItem) => {
    try {
      const userId = 1;
      await axios.post(`http://localhost:5000/cart`, {
        userId,
        bookId: item.id,
        quantity: 1, 
      });
      setCartItems((prevItems) => [...prevItems, item]);
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      const userId = 1; 
      await axios.delete(`http://localhost:5000/cart/${id}`);
      setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };

  const clearCart = async () => {
    try {
      const userId = 1; 
      await axios.delete(`http://localhost:5000/cart/${userId}`);
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
