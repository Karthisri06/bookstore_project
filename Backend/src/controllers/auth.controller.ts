
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { AuthRequest } from "../authrequest";



export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);
  const { email, password, userName } = req.body;

  try {
    const existingUser = await userRepo.findOneBy({ email });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const newUser = new User();
    newUser.userName= userName,
    newUser.email = email;
    newUser.password = await bcrypt.hash(password, 10);
    newUser.role = "user";

    console.log("New user before validation:", newUser);

    const errors = await validate(newUser);
    console.log("Validation errors:", errors);

    if (errors.length > 0) {
      res.status(400).json({ message: "Validation failed", errors });
      return;
    }
console.log(newUser, 'new user')
    await userRepo.save(newUser);
    console.log("User saved successfully!");


    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name:newUser.userName,
        email: newUser.email,
        role: newUser.role,
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


  export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({ where:{email} });
  
      if (!user) {
        res.status(404).json({ message: "Invalid email or password" });
        return 
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         res.status(401).json({ message: "Invalid password" });
         return 
      }
      // if (user.role !== 'admin' ) {
      //   res.status(403).json({ message: "You do not have admin privileges" });
      //   return;
      // }
  
      // Create JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role , name: user.userName },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );
      console.log(user, 'user')
  
       res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          userName: user.userName
        },
      });
    } catch (err) {
      console.error("Login error:", err);
       res.status(500).json({ message: "Server error" });
       return
    }
  };
  

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);

  try {
    const user = await userRepo.findOneBy({ id: req.user!.id });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
