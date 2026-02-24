import { Router } from "express";
import { addCategories, getCategories } from "../controllers/category.js";

const router = Router()

router.get(`/category`, getCategories)
router.post(`/category_add`, addCategories)

export default router