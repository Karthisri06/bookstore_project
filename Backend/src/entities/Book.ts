
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Genre } from "./Genre";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("simple-array")
  authors: string[];

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column()
  genre: string;
}

