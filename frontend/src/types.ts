
import { Key } from "react";

export interface Author {
    id: number;
    name: string;
    password:string;
  }
  
 
export interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  price: number;
  imageUrl: string;
  genre: string;
  publishedDate: string;
  pageCount: number;
  rating: number;
  bookId:number;
}

  
  export interface Genre {
    id: Key | null | undefined;
    name: string;
  }
  
  export interface AuthModal {
  show: boolean;
  handleClose: () => void;
  handleLoginSuccess: () => void; 
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  book: Book;
}
