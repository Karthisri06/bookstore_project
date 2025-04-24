import { registerUser, loginUser, getProfile, getAllUsers, editUser, deleteUser } from "../controllers/auth.controller";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { Request, Response } from "express";

jest.mock("../data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("class-validator", () => ({
  validate: jest.fn(),
}));

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res as Response;
};

const mockRepo = {
  findOneBy: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should register a new user", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
          userName: "TestUser",
        },
      } as Request;

      const res = mockResponse();
      mockRepo.findOneBy.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
      (validate as jest.Mock).mockResolvedValue([]);
      mockRepo.save.mockImplementation((user) => {
        user.id = 1;
        return Promise.resolve(user);
      });
      (jwt.sign as jest.Mock).mockReturnValue("fake_token");

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: "User registered successfully",
        token: "fake_token",
      }));
    });

    it("should not register if email exists", async () => {
      const req = { body: { email: "test@example.com", password: "pass", userName: "User" } } as Request;
      const res = mockResponse();
      mockRepo.findOneBy.mockResolvedValue({ id: 1 });

      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Email already exists" });
    });
  });

  describe("loginUser", () => {
    it("should login successfully", async () => {
      const req = { body: { email: "test@example.com", password: "password123" } } as Request;
      const res = mockResponse();

      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashed_password",
        role: "user",
        userName: "User",
      };

      mockRepo.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("login_token");

      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: "Login successful",
        token: "login_token",
      }));
    });

    it("should fail if email is invalid", async () => {
      const req = { body: { email: "notfound@example.com", password: "123" } } as Request;
      const res = mockResponse();

      mockRepo.findOne.mockResolvedValue(null);
      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid email or password" });
    });

    it("should fail if password does not match", async () => {
      const req = { body: { email: "test@example.com", password: "wrongpass" } } as Request;
      const res = mockResponse();

      mockRepo.findOne.mockResolvedValue({ password: "hashed_password" });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid password" });
    });
  });

  describe("getProfile", () => {
    it("should return user profile", async () => {
      const req = { user: { id: 1 } } as any;
      const res = mockResponse();

      mockRepo.findOneBy.mockResolvedValue({ id: 1, email: "test@example.com", role: "user" });

      await getProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ email: "test@example.com" }));
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const req = {} as any;
      const res = mockResponse();
      mockRepo.find.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      await getAllUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }, { id: 2 }]);
    });
  });

  describe("editUser", () => {
    it("should edit and return updated user", async () => {
      const req = {
        params: { id: "1" },
        body: { userName: "Updated", email: "new@mail.com", role: "admin" },
      } as any;
      const res = mockResponse();
      mockRepo.findOneBy.mockResolvedValue({ id: 1, userName: "Old", email: "old@mail.com", role: "user" });
      mockRepo.save.mockResolvedValue(true);

      await editUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "User updated successfully" }));
    });
  });

  describe("deleteUser", () => {
    it("should delete user", async () => {
      const req = { params: { id: "1" } } as any;
      const res = mockResponse();
      mockRepo.findOneBy.mockResolvedValue({ id: 1 });
      mockRepo.remove.mockResolvedValue(true);

      await deleteUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully" });
    });
  });
});

