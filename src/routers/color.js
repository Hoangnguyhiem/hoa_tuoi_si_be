import { Router } from "express";
import { createColor, deleteColor, getAllColor } from "../controllers/color.js";

const router = Router()

router.post("/color_add", createColor)
router.get("/color", getAllColor)
router.delete("/color_delete/:id", deleteColor)

export default router