import {Router} from "express";
import { getFoodData } from "../controllers/food.controllers.js";
const router = Router();

router.route("food-data").get(getFoodData);


export default router;