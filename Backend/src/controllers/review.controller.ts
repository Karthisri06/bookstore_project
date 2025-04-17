import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';
import { Review } from '../entities/Review';

export class ReviewController {
  async addReview(req: Request, res: Response) {
    console.log(req.body)
    try {
      const review = await ReviewService.createReview({
        comment: req.body.comment,
        rating: req.body.rating,
        user:req.body.user,
        book:req.body.book,
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: 'Error adding review', error });
    }
  }

  async getReviewsForBook(req: Request, res: Response) {
    try {
      const bookId = req.params.title;
      const reviews = await ReviewService.getReviewsByBook(bookId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error });
    }
  }

  async updateReview(req: Request, res: Response) {
    console.log(req.body, 'update')
    const { reviewId, content, rating } = req.body;

    const review = await Review.findOne({
      where: { id: reviewId },
      relations: ['user'],
    });

    if (review ) {
      review.comment = content;
      review.rating = rating;
      await review.save();
      res.json({ message: "Review updated successfully!" });
    } else {
      res.status(403).json({ message: "You can only update your own review." });
    }
  }

  async deleteReview(req: Request, res: Response) {
    console.log(req.body)
    const { reviewId } = req.body;

    const review = await Review.findOne({
      where: { id: reviewId },
      relations: ['user'],
    });

    if (review ) {
      await review.remove();
      res.json({ message: "Review deleted successfully!" });
    } else {
      res.status(403).json({ message: "You can only delete your own review." });
    }
  }
}




