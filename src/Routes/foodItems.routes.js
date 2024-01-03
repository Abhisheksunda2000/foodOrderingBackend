import {Router} from "express";
import { getFoodItems } from "../controllers/foodItems.controllers.js";
const router = Router();

router.route("/get-foodItems").get(getFoodItems);

export default router;