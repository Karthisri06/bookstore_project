import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';

const router = Router();

router.post('/', ReviewController.addReview);
router.get('/book/:bookId', ReviewController.getReviewsForBook);

export default router;
