import { StatusCodes } from "http-status-codes";
import User from "../models/user.js"

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
    }
}

export const getAllUser = async (req, res) => {
    try {
        const user = await User.find()
        return res.status(StatusCodes.OK).json(user)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        return res.status(StatusCodes.OK).json(user)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: error.message})
    }
}

