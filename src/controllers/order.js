import { StatusCodes } from "http-status-codes"
import Order from "../models/order.js"
import User from "../models/user.js";

export const addOrder = async (req, res) => {

    try {
        const user = await User.findById(req.body.userId)
            .select("phone address");
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found"
            });
        }
        const order = await Order.create({
            ...req.body,
            userPhone: user.phone,
            userAddress: user.address
        });
        return res.status(StatusCodes.CREATED).json(order)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const getOrder = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 15;
        const search = req.query.search || '';
        const status = req.query.status || 'pending';

        const order = await Order.find({
            status: status,
            $or: [
                { userPhone: { $regex: search, $options: "i" } },

                { userAddress: { $regex: search, $options: "i" } }
            ]
        })
            .populate({
                path: "userId",
                select: "name phone address createdAt"
            })
            .populate({
                path: "deliveryId",
            })
            .populate("products.categoryId")
            .populate("products.colorId")
            .skip(page * limit)
            .limit(limit)
            .sort({
                pin: -1,
                createdAt: -1
            })

        const totalPage = Math.ceil((await Order.countDocuments()) / limit);

        return res.status(StatusCodes.OK).json({
            data: order,
            page: page + 1,
            limit,
            totalPage
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
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

export const updateOrderById = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        await Order.updateStatus(order._id);
        await order.save()
        return res.status(StatusCodes.OK).json(order)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const updatePinOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.body._id);
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Không tìm thấy order"
            });
        }
        order.pin = req.body.pin;
        await order.save();
        return res.status(StatusCodes.OK).json({
            order
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        });
    }
}

export const deleteOrderById = async (req, res) => {

    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json({
            order
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
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
        await Order.updateOne(
            {
                "products._id": req.body.productId,
            },
            {
                $set: {
                    "products.$.status": req.body.status
                }
            }
        )

        const order = await Order.findOne({
            "products._id": req.body.productId
        });

        await Order.updateStatus(order._id);
        return res.status(StatusCodes.OK).json({ order })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}