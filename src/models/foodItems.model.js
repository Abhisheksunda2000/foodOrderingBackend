import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        required:true
    },
    categoryName:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }
}, {timestamps:true});

export const Food = mongoose.model("Food", foodSchema);
