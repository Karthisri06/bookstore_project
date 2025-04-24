import { Router } from "express";
import { PurchaseController } from "../controllers/purchase.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();


router.post("/purchase",  PurchaseController.buyBook);

router.get("/purchases", authenticate, PurchaseController.getMyPurchases);


router.delete("/purchase/:purchaseId", authenticate, PurchaseController.deletePurchase);

export default router;

