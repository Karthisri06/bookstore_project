import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsEmail, Length } from "class-validator";
import { Review } from "./Review";
import { Purchase } from "./Purchase";

export type UserRole = "admin" | "author" | "user";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(6, 100)
  password: string;

  @Column({ type: "enum", enum: ["admin", "author", "user"], default: "user" })
  role: UserRole;

  @Column()
  userName: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchase: Purchase[];
}
