import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./Review";
import { Purchase } from "./Purchase";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  genre: string;

  @Column({ default: true })
  isHotSelling: boolean;

  @Column({ type: "float", nullable: true })
  price: number;

  @Column()
  author: string;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

  @OneToMany(() => Purchase, (purchase) => purchase.book)
  purchase: Purchase[];
  rating: any;
  purchases: any;
}

