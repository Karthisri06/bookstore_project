
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";



export const assignAuthorRole = async (req: Request, res: Response) => {
    const userRepo = AppDataSource.getRepository(User);
    const { userId } = req.params;
  
    try {
      const user = await userRepo.findOneBy({ id: +userId });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.role = "author";
      await userRepo.save(user);
  
      res.status(200).json({ message: "User promoted to author" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  