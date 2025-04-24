import { AppDataSource } from "../data-source";
import { Purchase } from "../entities/Purchase";
import { User } from "../entities/User";
import { Book } from "../entities/Book";

export class PurchaseService {

  async buyBook(userId: number, bookId: number, quantity: number, address: string) {
    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    const book = await AppDataSource.getRepository(Book).findOneBy({ id: bookId });

    if (!user || !book) {
      throw new Error("User or Book not found");
    }

    const purchase = new Purchase();
    purchase.user = user;
    purchase.book = book;
    purchase.quantity = quantity;
    purchase.address = address;
    purchase.priceAtPurchase = book.price;

    await AppDataSource.getRepository(Purchase).save(purchase);
    return purchase;
  }

  async getMyPurchases(userId: number) {
    const purchases = await AppDataSource.getRepository(Purchase).find({
      where: { user: { id: userId } },
      relations: ["book"],
      order: { purchasedAt: "DESC" },
    });
    return purchases;
  }


 async deletePurchase(userId: number, purchaseId: number) {
    const purchase = await AppDataSource.getRepository(Purchase).findOne({
      where: { id: purchaseId, user: { id: userId } },
    });

    if (!purchase) {
      return false;
    }

    await AppDataSource.getRepository(Purchase).remove(purchase);
    return true; 
  }
}
