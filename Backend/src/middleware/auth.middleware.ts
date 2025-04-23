import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
console.log('tes1')
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log('tes1')

    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }
  console.log('tes2')

  try {
    const token = authHeader.split(" ")[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    //   id: number;
    //   role: string;
    //   name: string;
    // };
    // // req.user = decoded;
    console.log('tes33456')
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};


export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: "Forbidden: Admin access only" });
    return
  }
  next();
};

