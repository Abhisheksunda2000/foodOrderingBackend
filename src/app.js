import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// routes import 
import userRouter from "./Routes/user.routes.js";
import orderRouter from "./Routes/order.routes.js";
import foodRouter from "./Routes/food.routes.js";

// routes declartation
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/foods", foodRouter);

export {app}