
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Genre } from "./Genre";
import { User } from "./User";
import { Review } from "./Review";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  authors: string;

  @Column({type:"text",nullable:true})
  description: string;

  @Column({nullable:true})
  imageUrl: string;

  @Column()
   genre: string;


  @Column({ default: true })
  isHotSelling: boolean;

  @ManyToOne(() => User, (user) => user.books, { nullable: true })
  author: User; // This must be of type User

  @Column({ type: "float", nullable: true })
  price: number;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

}


