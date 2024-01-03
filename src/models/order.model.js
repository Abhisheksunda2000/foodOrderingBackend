import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    orderData:{
        type:Array,
        required:true
    }
});

export const Order = mongoose.model("Order", orderSchema);
