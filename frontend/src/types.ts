// src/types.ts

export interface Author {
    id: number;
    name: string;
  }
  
  export interface Book {
    id: number;
    title: string;
    author: Author;
    imageUrl: string;
    genre: string;
    isHotSelling?: boolean;
  }
  
  export interface Genre {
    name: string;
  }
  