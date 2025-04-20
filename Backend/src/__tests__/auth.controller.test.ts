import { registerUser } from "../controllers/auth.controller";
import request from "supertest";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import app from "..";
import jwt from "jsonwebtoken";


const mockUserRepo = {
  findOneBy: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
};


jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return {
    ...actual,
    getRepository: () => mockUserRepo,
  };
});


beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  describe('registerUser', () => {

    it('should register a new user successfully', async () => {
      mockUserRepo.findOneBy.mockResolvedValue(null);
      mockUserRepo.save.mockResolvedValue(true);

      const response = await request(app)
        .post('/auth/register') 
        .send({
          email: 'test@gmail.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
    });

    it('should fail if user already exists', async () => {
      mockUserRepo.findOneBy.mockResolvedValue({ id: 1, email: 'test@gmail.com' });

      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@gmail.com',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email already exists');
    });
  });

 
  describe('loginUser', () => {
    it('should login successfully with correct credentials', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      mockUserRepo.findOne.mockResolvedValue({
        id: 1,
        email: 'test@gmail.com',
        password: hashedPassword,
        role: 'user',
      });

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.token).toBeDefined();
    });

    it('should fail with wrong password', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      mockUserRepo.findOne.mockResolvedValue({
        email: 'test@example.com',
        password: hashedPassword,
      });

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid password');
    });

    it('should fail if user not found', async () => {
      mockUserRepo.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'notfound@gmail.com',
          password: 'password123',
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Invalid email or password');
    });
  });


  describe('getProfile', () => {
    it('should return user profile with valid token', async () => {
      const fakeUser = { id: 1, email: 'user@gmail.com', role: 'user' };
      const token = jwt.sign(fakeUser, process.env.JWT_SECRET!, { expiresIn: '1h' });

      mockUserRepo.findOneBy.mockResolvedValue(fakeUser);

      const response = await request(app)
        .get('/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });

    it('should return 404 if user not found', async () => {
      const token = jwt.sign({ id: 999, role: 'user' }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      mockUserRepo.findOneBy.mockResolvedValue(null);

      const response = await request(app)
        .get('/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });
});
