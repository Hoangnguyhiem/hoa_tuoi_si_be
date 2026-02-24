import { StatusCodes } from "http-status-codes"
import Category from "../models/category"

export const addCategories = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.status(StatusCodes.CREATED).json(category)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}

export const getCategories = async (req, res) => {
    try {
        const category = await Category.find()
        return res.status(StatusCodes.OK).json(category)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
}