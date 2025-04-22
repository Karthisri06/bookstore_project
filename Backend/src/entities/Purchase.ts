import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from '../entities/User';
  import { Book } from '../entities/Book';
  
  @Entity()
  export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.purchases)
    user: User;
  
    @ManyToOne(() => Book, (book) => book.purchases)
    book: Book;
  
    @Column('int')
    quantity: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;
  
    @CreateDateColumn()
    purchasedAt: Date;
  }
  