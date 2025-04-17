import { Router } from 'express';
import { getProfile } from '../controllers/auth.controller';
import { authenticate , isAdmin } from '../middleware/auth.middleware'; // Create an isAdmin middleware

const router = Router();

router.get('/admin', authenticate , isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome to the Admin Panel" });
});

export default router;
