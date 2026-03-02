import { StatusCodes } from "http-status-codes"
import Order from "../models/order.js"

export const addOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body)
        return res.status(StatusCodes.CREATED).json(order)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const getOrder = async (req, res) => {
    try {
        const order = await Order.find()
            .populate({
                path: "userId",
                select: "name phone address createdAt"
            })
            .populate({
                path: "deliveryId",
            })
            .populate("products.categoryId")
            .populate("products.colorId");
        return res.status(StatusCodes.OK).json(order)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const getDeliveryByUserId = async (req, res) => {
    try {
        const order = await Order.find({ userId: req.params.id })
            .sort({ createdAt: -1 })
            .limit(1)
        const lastDeliveryId = order[0]?.deliveryId || null;
        return res.status(StatusCodes.OK).json({
            deliveryId: lastDeliveryId
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const getCheckItemProduct = async (req, res) => {

    try {
        const order = await Order.updateOne(
            {
                "products._id": req.body.productId,
            },
            {
                $set: {
                    "products.$.status": req.body.status
                }
            }
        );
        return res.status(StatusCodes.OK).json({ order })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}