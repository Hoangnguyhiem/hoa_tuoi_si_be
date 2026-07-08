import { Router } from "express";
import { addCategories, deleteCategoriesById, getCategories } from "../controllers/category.js";

const router = Router()

router.get(`/category`, getCategories)
router.post(`/category_add`, addCategories)
router.delete(`/category_delete/:id`, deleteCategoriesById)

export default router