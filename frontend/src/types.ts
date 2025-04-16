
import { Key } from "react";

export interface Author {
    id: number;
    name: string;
    password:string;
  }
  
  export interface Book {
    authors: string;
    id: number;
    title: string;
    author: Author;
    imageUrl: string;
    genre: string;
    price: number;
    isHotSelling?: boolean;
  }
  
  export interface Genre {
    id: Key | null | undefined;
    name: string;
  }
  
  export interface AuthModal {
  show: boolean;
  handleClose: () => void;
  handleLoginSuccess: () => void; // Added this for login success
}
