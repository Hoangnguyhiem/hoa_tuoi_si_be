import { Router } from "express";
import { addDelivery, getDelivery } from "../controllers/delivery";

const router = Router()

router.post("/delivery_add", addDelivery),
router.get("/delivery", getDelivery)

export default router