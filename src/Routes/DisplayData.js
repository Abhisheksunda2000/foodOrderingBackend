const express = require("express");
const router = express.Router();

router.post('/foodData', async (req,res) =>{
    try{
        console.log(global.food_items);
        res.send([global.food_items,global.food_category]);
    } catch(error){
        console.log(error.message);
         res.send("Server Error");
    }
})

module.exports = router;