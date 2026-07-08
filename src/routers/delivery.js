import { Router } from "express";
import { addDelivery, deleteDelivery, getDelivery } from "../controllers/delivery.js";

const router = Router()

router.post("/delivery_add", addDelivery),
router.get("/delivery", getDelivery)
router.delete("/delivery_delete/:id", deleteDelivery)

export default router