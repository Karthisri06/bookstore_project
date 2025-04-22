// src/services/cart.service.ts
import { AppDataSource } from "../data-source";
import { Cart } from "../entities/Cart";
import { User } from "../entities/User";
import { Book } from "../entities/Book";

const cartRepo = AppDataSource.getRepository(Cart);
const userRepo = AppDataSource.getRepository(User);
const bookRepo = AppDataSource.getRepository(Book);

export const CartService = {
  addToCart: async (userId: number, bookId: number, quantity: number) => {
    const user = await userRepo.findOneBy({ id: userId });
    const book = await bookRepo.findOneBy({ id: bookId });

    if (!user || !book) throw new Error("User or Book not found");

    const cartItem = new Cart();
    cartItem.user = user;
    cartItem.book = book;
    cartItem.quantity = quantity;

    return await cartRepo.save(cartItem);
  },

  getUserCart: async (userId: number) => {
    return await cartRepo.find({
      where: { user: { id: userId } },
      relations: ["book"],
    });
  },

  removeFromCart: async (itemId: number) => {
    await cartRepo.delete(itemId);
  }
};

