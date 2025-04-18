import { ReviewService } from "../services/review.service";
import { AppDataSource } from "../data-source";
import { vi, describe, it, expect } from "vitest";

vi.mock("../data-source", () => ({
  AppDataSource: {
    getRepository: vi.fn()
  }
}));

describe("ReviewService", () => {
  it("should create a review", async () => {
    const mockData = {
      comment: "Great book!",
      rating: 5,
      user: "user123",
      book: "book456",
    };

    const create = vi.fn().mockReturnValue(mockData);
    const save = vi.fn().mockResolvedValue(mockData);

    const mockRepo = { create, save };
    (AppDataSource.getRepository as any).mockReturnValue(mockRepo);

    const result = await ReviewService.createReview(mockData);

    expect(create).toHaveBeenCalledWith(mockData);
    expect(save).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });

  it("should get reviews by book ID", async () => {
    const mockReviews = [
      { comment: "Nice", rating: 4, book: "book1" },
      { comment: "Loved it", rating: 5, book: "book1" },
    ];

    const find = vi.fn().mockResolvedValue(mockReviews);
    const mockRepo = { find };
    (AppDataSource.getRepository as any).mockReturnValue(mockRepo);

    const result = await ReviewService.getReviewsByBook("book1");

    expect(find).toHaveBeenCalledWith({ where: { book: "book1" } });
    expect(result).toEqual(mockReviews);
  });
});
