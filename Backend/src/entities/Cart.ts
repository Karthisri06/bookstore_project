
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookName: string;

  @Column({type:"text",nullable:true})
  description: string;

  @Column({nullable:true})
  imageUrl: string;

  @Column()
  price:string;

  @Column()
  userName:string;
}