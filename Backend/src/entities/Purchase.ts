import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.purchase)
  user: User;

  @ManyToOne(() => Book)
  book: Book;

  @Column()
  quantity: number;

  @CreateDateColumn()
  purchasedAt: Date;
}
