import { Router } from "express";
import { addDelivery, getDelivery } from "../controllers/delivery.js";

const router = Router()

router.post("/delivery_add", addDelivery),
router.get("/delivery", getDelivery)

export default router