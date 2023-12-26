const mongoose = require("mongoose");

const {Schema} = mongoose;

const OrderScheam = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_date:{
        type:Array,
        required:true
    }

});

module.exports = mongoose.model("Order", OrderScheam);
