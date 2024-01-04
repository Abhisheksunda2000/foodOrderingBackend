import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";

const getFoodItems = asyncHandler(async (req, res) => {
    try {
      const fetchedData =  mongoose.connection.db.collection("food_items");
      const data = await fetchedData.find({}).toArray();
  
      const foodCategory = mongoose.connection.db.collection("food_category");
      const catData = await foodCategory.find({}).toArray();
  
      if (!data || !catData) {
        throw new ApiError(400, "Data retrieval failed");
      }
  
      return res.status(200).json(
        new ApiResponse(200, { foodItems: data, foodCategory: catData }, "Data fetched successfully")
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json(new ApiResponse(500, null, "Server error"));
    }
  });
  

export {
    getFoodItems
}