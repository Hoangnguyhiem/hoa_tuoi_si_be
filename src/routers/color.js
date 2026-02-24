import { Router } from "express";
import { createColor, getAllColor } from "../controllers/color";

const router = Router()

router.post("/color_add", createColor)
router.get("/color", getAllColor)

export default router