import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/foodCategory.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

const createCategory = asyncHandler(async (req,res) =>{

    const {categoryName} = req.body;

    if(!categoryName){
        throw new ApiError(400,"category Name should be present");
    }

    const category = await Category.create({categoryName});

    if(!category){
        throw new ApiError(500, "something went wrong in creating category");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "", " new category successfully created")
    )
});

const getCategory = asyncHandler(async (req,res) =>{

    const food_category = await mongoose.connection.db.collection('categories').find({}).toArray();

    return res
    .status(200)
    .json(
        new ApiResponse(200, food_category, "food_category fetched successfully")
    )
});

export {
    createCategory,
    getCategory
}