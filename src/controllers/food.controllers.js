import { asyncHandler } from "../utils/asyncHandler.js";

const getFoodData = asyncHandler(async(req,res) =>{

});

export {getFoodData};

// router.post('/foodData', async (req,res) =>{
//     try{
//         console.log(global.food_items);
//         res.send([global.food_items,global.food_category]);
//     } catch(error){
//         console.log(error.message);
//          res.send("Server Error");
//     }
// })