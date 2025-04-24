import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Purchase } from "../entities/Purchase";
import { User } from "../entities/User";
import { Book } from "../entities/Book";
import { AuthRequest } from "../middleware/auth.middleware"; 
import { getRepository } from "typeorm";

export const PurchaseController = {
  buyBook: async (req: AuthRequest, res: Response): Promise<void> => {
    // const userId = req.user?.id;
    const { bookId, quantity, address,userName } = req.body;

    try {
      const user = await AppDataSource.getRepository(User).findOneBy({ userName: userName });
      const book = await AppDataSource.getRepository(Book).findOneBy({ id: bookId });

      console.log('===>user',user)
      console.log('====>book',book)
      if (!user || !book) {
        res.status(404).json({ message: "User or Book not found" });
        return;
      }

      const purchase = new Purchase();
      purchase.user = user;
      purchase.book = book;
      purchase.quantity = quantity;
      purchase.address = address;
      purchase.priceAtPurchase = book.price;

      console.log('==?',purchase)

      await AppDataSource.getRepository(Purchase).save(purchase);
      res.status(201).json({ message: "Purchase successful" });
    } catch (error) {
      res.status(500).json({ message: "Purchase failed", error });
    }
  },

  getMyPurchases: async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;

    try {
      const purchases = await AppDataSource.getRepository(Purchase).find({
        where: { user: { id: userId } },
        relations: ["book"],
        order: { purchasedAt: "DESC" },
      });

      res.json(purchases);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch purchases", error });
    }
  },

  deletePurchase: async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const purchaseId = parseInt(req.params.purchaseId);

    try {
      const purchase = await AppDataSource.getRepository(Purchase).findOne({
        where: { id: purchaseId },
        relations: ["user"],
      });

      if (!purchase || purchase.user.id !== userId) {
        res.status(403).json({ message: "Not allowed to delete this purchase" });
        return;
      }

      await AppDataSource.getRepository(Purchase).remove(purchase);
      res.status(200).json({ message: "Purchase deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete purchase", error });
    }
  }
};



export const getAllPurchases = async (req: Request, res: Response):Promise<void> => {
  try {
   
    const purchases = await AppDataSource.getRepository(Purchase).find({
      relations: ["user", "book"], 
    });

  
    res.status(200).json(purchases);
    return 
  } catch (error) {
    console.error("Error fetching purchases:", error);
   res.status(500).json({ message: "Failed to fetch purchases" });
   return
  }
};

