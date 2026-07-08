import { Router } from "express"
import { addOrder, deleteOrderById, getCheckItemProduct, getDeliveryByUserId, getOrder, getOrderById, updateOrderById, updatePinOrder } from "../controllers/order.js"

const router = Router()

router.post("/order_add", addOrder),
router.get("/order", getOrder),
router.get("/order/:id", getOrderById),
router.post("/updatePin", updatePinOrder),
router.delete("/deleteOrder/:id", deleteOrderById),
router.put("/updateOrder/:id", updateOrderById),
router.get("/deliveryid/:id", getDeliveryByUserId),
router.put("/updateStatusProduct", getCheckItemProduct)

export default router