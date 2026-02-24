import { StatusCodes } from "http-status-codes"
import Order from "../models/order.js"

export const addOrder = async (req, res) => {
    try {

        console.log(req.body);

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