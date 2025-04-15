
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Genre } from "./Genre";

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

  @ManyToOne(() => Genre, (genre) => genre.books)
  genre: Genre;

  @Column({ default: true })
  isHotSelling: boolean;

  @Column({ type: "float", nullable: true })
  price: number;



}


