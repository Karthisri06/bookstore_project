import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';

export class ReviewController {
  static async addReview(req: Request, res: Response) {
    try {
      const review = await ReviewService.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: 'Error adding review', error });
    }
  }

  static async getReviewsForBook(req: Request, res: Response) {
    try {
      const bookId = parseInt(req.params.bookId);
      const reviews = await ReviewService.getReviewsByBook(bookId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error });
    }
  }
}
