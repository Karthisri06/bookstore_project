
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

export class AuthService {

   async register(name: string, email: string, password: string, role: string) {
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({

      email,
      password: hashedPassword,
      role,
    });

    await userRepository.save(newUser);
    return newUser;
  }


   async login(email: string, password: string) {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // JWT token generation
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return { token, user };
  }

  // (Optional) Get current user info from token
   async getProfile(userId: number) {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
