import { Router } from "express"
import { addOrder, getCheckItemProduct, getDeliveryByUserId, getOrder } from "../controllers/order.js"

const router = Router()

router.post("/order_add", addOrder),
router.get("/order", getOrder),
router.get("/deliveryid/:id", getDeliveryByUserId)
router.put("/updataStatusProduct", getCheckItemProduct)

export default router