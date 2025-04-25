import { AppDataSource } from '../data-source';
import { Review } from '../entities/Review';
import { User } from '../entities/User';
import { Book } from '../entities/Book';
import { response } from 'express';

export class ReviewService {
  static getReviewsByBook(bookId:string) {
    const reviewRepo = AppDataSource.getRepository(Review);
   const data = reviewRepo.find({
      where: { book: bookId },
    });
    console.log(data, 'sertyujfyuiokj')
    return data;
  }
   static async createReview(data: {
    comment: string; 
    rating: number;
    user: string; 
    book: string; 
    userName:string
  }) {
    console.log('tyu', data)
    const reviewRepo = AppDataSource.getRepository(Review);
  
    const review = reviewRepo.create({
      comment: data.comment,
      rating: data.rating,
      book: data.book, 
      userName:data.userName,
    });
    console.log("reviews",review)
  const Response = await reviewRepo.save(review)
  console.log("----->response",response)
    return Response;
  }

}

