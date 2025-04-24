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
  console.log('entered')
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log('No token provided or incorrect header format');
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    //   id: number;
    //   role: string;
    //   name: string;
    // };
    // console.log("decode user:",decoded)
    // req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed', err);
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
    return;
  }
  next();
};


