import { StatusCodes } from "http-status-codes"
import Color from "../models/color"

export const createColor = async (req, res) => {
    try {
        const color = await Color.create(req.body)
        return res.status(StatusCodes.CREATED).json(color)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
    }
}

export const getAllColor = async (req, res) => {
    try {
        const color = await Color.find()
        return res.status(StatusCodes.OK).json(color)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
    }
}