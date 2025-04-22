
import { Request, Response } from "express";
import { CartService } from "../services/cart.service";

export const CartController = {
 
  addToCart: async (req: Request, res: Response) => {
    try {
      const { userId, bookId, quantity } = req.body;
      const cartItem = await CartService.addToCart(userId, bookId, quantity);
      res.status(201).json(cartItem);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },


  getUserCart: async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const cartItems = await CartService.getUserCart(userId);
      res.json(cartItems);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  removeFromCart: async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.itemId);
      await CartService.removeFromCart(itemId);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
