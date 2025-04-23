// src/services/cart.service.ts
import { AppDataSource } from "../data-source";
import { Cart } from "../entities/Cart";
import { User } from "../entities/User";
import { Book } from "../entities/Book";

const cartRepo = AppDataSource.getRepository(Cart);
const userRepo = AppDataSource.getRepository(User);
const bookRepo = AppDataSource.getRepository(Book);

export const CartService = {
  addToCart: async (data: {  bookName: string; description: string; imageUrl: string, price:string, userName:string}) => {
    // const user = await userRepo.findOneBy({ id: userId });
    // const book = await bookRepo.findOneBy({ id: bookId });

    if (!data.bookName || !data.userName) throw new Error("User or Book not found");

    const cartItem = new Cart();
    cartItem.bookName = data.bookName;
    cartItem.description = data.description;
    cartItem.imageUrl = data.imageUrl;
    cartItem.price = data.price;
    cartItem.userName = data.userName;

    return await cartRepo.save(cartItem);
  },

  getUserCart: async (userName: string) => {
    const res  = await cartRepo.findOneBy({ userName });
        return res;
  },
  

  removeFromCart: async (id: number) => {
    await cartRepo.delete(id);
  }
};

