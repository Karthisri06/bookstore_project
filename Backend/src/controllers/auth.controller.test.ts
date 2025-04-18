import { registerUser } from "../controllers/auth.controller";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { vi, describe, it, expect } from "vitest";

vi.mock("../data-source", () => ({
  AppDataSource: {
    getRepository: vi.fn()
  }
}));

vi.mock("bcrypt", () => ({
  hash: vi.fn(() => "hashedPassword")
}));

describe("registerUser", () => {
  const mockReq = {
    body: {
      email: "test@example.com",
      password: "password123",
    },
  } as Request;

  const mockRes = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as unknown as Response;

  it("should register a user successfully", async () => {
    const save = vi.fn();
    const findOneBy = vi.fn().mockResolvedValue(null);

    const mockRepo = {
      findOneBy,
      save,
    };

    (AppDataSource.getRepository as any).mockReturnValue(mockRepo);

    await registerUser(mockReq, mockRes);

    expect(findOneBy).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(save).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
  });

  it("should return 400 if email already exists", async () => {
    const mockUser = new User();
    const mockRepo = {
      findOneBy: vi.fn().mockResolvedValue(mockUser),
    };

    (AppDataSource.getRepository as any).mockReturnValue(mockRepo);

    await registerUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Email already exists",
    });
  });
});
