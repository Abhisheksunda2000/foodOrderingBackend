import {Router} from "express";
import { createOrder, getOrderData } from "../controllers/order.controllers.js";
const router = Router();

router.route("/order").post(createOrder);
router.route("/order-data").get(getOrderData);

export default router;