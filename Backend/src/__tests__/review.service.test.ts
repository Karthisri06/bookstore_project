
import { AppDataSource } from '../data-source';
import { Review } from '../entities/Review';
import { ReviewService } from '../services/review.service';

jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('ReviewService', () => {
  const mockSave = jest.fn();
  const mockCreate = jest.fn();
  const mockFind = jest.fn();

  beforeEach(() => {
    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      create: mockCreate,
      save: mockSave,
      find: mockFind,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReview', () => {
    it('should create and save a review', async () => {
      const reviewData = {
        comment: 'Amazing book!',
        rating: 5,
        user: 'user123',
        book: 'book123',
      };

      const mockReview = { ...reviewData, id: 'review1' };
      mockCreate.mockReturnValue(mockReview);
      mockSave.mockResolvedValue(mockReview);

      const result = await ReviewService.createReview(reviewData);

      expect(mockCreate).toHaveBeenCalledWith(reviewData);
      expect(mockSave).toHaveBeenCalledWith(mockReview);
      expect(result).toEqual(mockReview);
    });
  });

  describe('getReviewsByBook', () => {
    it('should return reviews for a book', async () => {
      const bookId = 'book123';
      const mockReviews = [
        { id: '1', comment: 'Great read', rating: 4 },
        { id: '2', comment: 'Not bad', rating: 3 },
      ];
      mockFind.mockResolvedValue(mockReviews);

      const reviewService = new ReviewService();
      const result = await reviewService.getReviewsByBook(bookId);

      expect(mockFind).toHaveBeenCalledWith({
        where: { book: bookId },
      });
      expect(result).toEqual(mockReviews);
    });
  });
});

