
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.purchase)
  user: User;

  @ManyToOne(() => Book, (book) => book.purchase)
  book: Book;

  @Column()
  quantity: number;

  @Column()
  address: string;

  @Column("decimal", { precision: 10, scale: 2 })
  priceAtPurchase: number;

  @Column({ default: "pending" }) 
  status: string;

  @CreateDateColumn()
  purchasedAt: Date;
}
