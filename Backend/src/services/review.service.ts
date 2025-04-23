import { AppDataSource } from '../data-source';
import { Review } from '../entities/Review';
import { User } from '../entities/User';
import { Book } from '../entities/Book';

export class ReviewService {
  static async createReview(data: {
    comment: string; 
    rating: number;
    user: string; 
    book: string; 
  }) {
    const reviewRepo = AppDataSource.getRepository(Review);
  
    const review = reviewRepo.create({
      comment: data.comment,
      rating: data.rating,
      user: data.user, 
      book: data.book,  
    });
  const Response = await reviewRepo.save(review)
    return Response;
  }

  static async getReviewsByBook(bookId:string) {
    const reviewRepo = AppDataSource.getRepository(Review);
    return reviewRepo.find({
      where: { book: bookId },
    });
  }
}

