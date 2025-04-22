
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { OneToMany } from "typeorm";
import { Book } from "./Book";
import { Review } from "./Review";


export type UserRole = "admin" | "author" | "user";

@Entity()
export class User {
  purchases: unknown;
    cartItems: any;
  static findOne(arg0: { where: { id: number; }; }) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail({},{message:"Email must be valid"})
  email: string;

  @Column()
  @Length(6,100)
  password: string;

  @Column({ type: "enum", enum: ["admin", "author", "user"], default: "user" })
  role: string;

  @OneToMany(() => Book, (book) => book.authors)
  books: Book[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Column()
  userName:string;
}
