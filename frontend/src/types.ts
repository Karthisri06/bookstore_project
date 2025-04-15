
import { Key } from "react";

export interface Author {
    id: number;
    name: string;
  }
  
  export interface Book {
    authors: string;
    id: number;
    title: string;
    author: Author;
    imageUrl: string;
    genre: Genre;
    price: number;
    isHotSelling?: boolean;
  }
  
  export interface Genre {
    id: Key | null | undefined;
    name: string;
  }
  