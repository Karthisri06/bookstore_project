import { AppDataSource } from '../data-source';
import { Review } from '../entities/Review';
import { User } from '../entities/User';
import { Book } from '../entities/Book';

export class ReviewService {
  static async createReview(data: {
    content: string;
    rating: number;
    userId: number;
    bookId: number;
  }) {
    const reviewRepo = AppDataSource.getRepository(Review);
    const userRepo = AppDataSource.getRepository(User);
    const bookRepo = AppDataSource.getRepository(Book);

    const user = await userRepo.findOneBy({ id: data.userId });
    const book = await bookRepo.findOneBy({ id: data.bookId });

    if (!user || !book) throw new Error('User or Book not found');

    const review = reviewRepo.create({
      content: data.content,
      rating: data.rating,
      user,
      book,
    });

    return await reviewRepo.save(review);
  }

  static async getReviewsByBook(bookId: number) {
    const reviewRepo = AppDataSource.getRepository(Review);
    return reviewRepo.find({
      where: { book: { id: bookId } },
      relations: ['user'], // to show who wrote it
    });
  }
}
