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
   console.log("=========>",authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
   res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    console.log('---------->',token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (err) {
    console.error(' Token verification failed:', err);
   res.status(403).json({ message: "Invalid token" });
   return
  }
};
