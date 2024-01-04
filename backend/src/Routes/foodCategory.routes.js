import {Router} from "express";
import { createCategory, getCategory } from "../controllers/foodCategory.controllers.js";
const router = Router();

// backend routes
router.route("/create-category").post(createCategory);
router.route("/get-category").get(getCategory)

export default router;
