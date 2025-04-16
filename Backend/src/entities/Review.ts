

import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne,
  } from 'typeorm';
  import { User } from './User';
  import { Book } from './Book';
  
  @Entity()
  export class Review {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;
  
    @Column({ type: 'int' })
    rating: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(() => User, (user) => user.reviews)
    user: User;
  
    @ManyToOne(() => Book, (book) => book.reviews)
    book: Book;
  }
  