import { Router } from "express"
import { addOrder, getOrder } from "../controllers/order"

const router = Router()

router.post("/order_add", addOrder),
router.get("/order", getOrder)

export default router