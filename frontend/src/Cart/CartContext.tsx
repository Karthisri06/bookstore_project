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
  const [userName, setUserName] = useState<string | null>(null);

 
  useEffect(() => {
    const username = localStorage.getItem('userName');
    console.log(username, 'test');
    setUserName(username);
  
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cart/${username}`);
        const data = response.data;
        console.log(data, ' cart test');
  
        // If data is an object, wrap it in an array
        if (Array.isArray(data)) {
          setCartItems(data);
        } else if (data && typeof data === 'object') {
          setCartItems([data]); // Wrap the single object in an array
        } else {
          setCartItems([]);
          console.error("Cart data is not in the expected format:", data);
        }
      } catch (error) {
        toast.error("Failed to fetch cart items");
      }
    };
  
    fetchCartItems();
  }, []);
  

  const addToCart = async (item: CartItem) => {
    try {
      const userId = 1;
      const res= await axios.post(`http://localhost:5000/cart`, item);
      console.log(res, 'card')
      setCartItems((prevItems) => [...prevItems, item]);
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      console.log(itemId, 'itemid')
      await axios.delete(`http://localhost:5000/cart/${itemId}`);
      setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error("Error removing from cart:", error);
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
