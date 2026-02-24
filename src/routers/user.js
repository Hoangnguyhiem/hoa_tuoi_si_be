import { Router } from "express";
import { createUser, getAllUser, getUserById } from "../controllers/user.js";

const router = Router()

router.post("/user_add", createUser)
router.get("/user", getAllUser)
router.get("/user/:id", getUserById)

export default router