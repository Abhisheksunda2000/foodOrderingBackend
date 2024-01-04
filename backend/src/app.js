import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN  ? process.env.CORS_ORIGIN.split(',')  : ['http://localhost:3000', 'http://localhost:3001'];
// configurations
app.use(
  cors({
    origin: function (origin, callback) {
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  })
);

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// routes import 
import userRouter from "./Routes/user.routes.js";
import orderRouter from "./Routes/order.routes.js";
import foodRouter from "./Routes/foodItems.routes.js";
import categoryRouter from "./Routes/foodCategory.routes.js";

// routes declartation
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/foods", foodRouter);
app.use("/api/v1/categories", categoryRouter);

export {app}
