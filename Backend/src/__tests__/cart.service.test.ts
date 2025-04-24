import { CartController } from "../controllers/cart.controller";
import { CartService } from "../services/cart.service";
import { Request, Response } from "express";


jest.mock("../services/cart.service");

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("CartController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addToCart", () => {
    it("should add an item to the cart and return status 201", async () => {
      const req = { body: { userName: "karthi", bookId: 1 } } as Request;
      const res = mockResponse();
      (CartService.addToCart as jest.Mock).mockResolvedValue({ id: 1, ...req.body });

      await CartController.addToCart(req, res);

      expect(CartService.addToCart).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it("should return 400 if CartService throws an error", async () => {
      const req = { body: {} } as Request;
      const res = mockResponse();
      (CartService.addToCart as jest.Mock).mockRejectedValue(new Error("Invalid input"));

      await CartController.addToCart(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid input" });
    });
  });

  describe("getUserCart", () => {
    it("should return the user’s cart", async () => {
      const req = { params: { userName: "karthi" } } as unknown as Request;
      const res = mockResponse();
      const mockCart = [{ id: 1, bookId: 2, userName: "karthi" }];
      (CartService.getUserCart as jest.Mock).mockResolvedValue(mockCart);

      await CartController.getUserCart(req, res);

      expect(CartService.getUserCart).toHaveBeenCalledWith("karthi");
      expect(res.json).toHaveBeenCalledWith(mockCart);
    });

    it("should return 400 on error", async () => {
      const req = { params: { userName: "unknown" } } as unknown as Request;
      const res = mockResponse();
      (CartService.getUserCart as jest.Mock).mockRejectedValue(new Error("User not found"));

      await CartController.getUserCart(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });

  describe("removeFromCart", () => {
    it("should remove item from cart and return status 204", async () => {
      const req = { params: { itemId: "5" } } as unknown as Request;
      const res = mockResponse();
      (CartService.removeFromCart as jest.Mock).mockResolvedValue(undefined);

      await CartController.removeFromCart(req, res);

      expect(CartService.removeFromCart).toHaveBeenCalledWith(5);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it("should return 400 if remove fails", async () => {
      const req = { params: { itemId: "invalid" } } as unknown as Request;
      const res = mockResponse();
      (CartService.removeFromCart as jest.Mock).mockRejectedValue(new Error("Invalid itemId"));

      await CartController.removeFromCart(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid itemId" });
    });
  });
});
