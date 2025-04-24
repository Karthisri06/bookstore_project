import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { authenticate } from '../middleware/auth.middleware';
import { request } from 'http';

const router = Router();
const controller = new ReviewController();

router.post('/', authenticate, controller.addReview);
router.get('/book/:title', controller.getReviewsForBook);
router.put('/', authenticate, controller.updateReview);
router.delete('/', authenticate, controller.deleteReview);

// router.get('/:title',controller.getReviewsByBookTitle)

export default router;
