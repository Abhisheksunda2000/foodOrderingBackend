import { Order } from "../models/order.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const createOrder = asyncHandler(async(req,res) =>{

    const {email, orderData, orderDate} = req.body;
    const data = [{orderDate}, ...orderData];
    
    const existedOrders = await Order.findOne({email});

    if(!existedOrders){
        await Order.create({
            email,
            orderData : [data]
        })
    }
    else{
        await Order.findOneAndUpdate(
            {email},
            {
                $push:{
                    orderData: data
                }
            }
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,"", "order successully created")
    );

});

const getOrderData = asyncHandler(async (req,res) =>{

    const {email} = req.body;

    const existedOrder = await Order.findOne({email});

    if(!existedOrder){
        throw new ApiError(400, "No order history found with this email");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, existedOrder.orderData, "order data fetched successfully")
    )

});

export {
createOrder,
getOrderData
}







// const express = require("express");
// const router = express.Router();
// const Order = require("../models/order.model");

// router.post("/orderData", async (req, res) => {
//   let data = req.body.order_data;
//   await data.splice(0, 0, { Order_date: req.body.order_date });
//   console.log("1231242343242354", req.body.email);

//   //if email not exisitng in db then create: else: InsertMany()
//   let eId = await Order.findOne({ email: req.body.email });
//   console.log(eId);
//   if (eId === null) {
//     try {
//       console.log(data);
//       console.log("1231242343242354", req.body.email);
//       await Order.create({
//         email: req.body.email,
//         order_data: [data],
//       }).then(() => {
//         res.json({ success: true });
//       });
//     } catch (error) {
//       console.log(error.message);
//       res.send("Server Error", error.message);
//     }
//   } else {
//     try {
//       await Order.findOneAndUpdate(
//         { email: req.body.email },
//         { $push: { order_data: data } }
//       ).then(() => {
//         res.json({ success: true });
//       });
//     } catch (error) {
//       console.log(error.message);
//       res.send("Server Error", error.message);
//     }
//   }
// });

// router.post("/myOrderData", async (req, res) => {
//   try {
//     console.log(req.body.email);
//     let eId = await Order.findOne({ email: req.body.email });
//     //console.log(eId)
//     res.json({ orderData: eId });
//   } catch (error) {
//     res.send("Error", error.message);
//   }
// });

// module.exports = router;
