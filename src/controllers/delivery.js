import { StatusCodes } from "http-status-codes"
import Delivery from "../models/delivery.js"

export const addDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.create(req.body)
        return res.status(StatusCodes.CREATED).json(delivery)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({mesage:error.message})
    }
}

export const getDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.find().lean()
        return res.status(StatusCodes.OK).json(delivery)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({mesage:error.message})
    }
}