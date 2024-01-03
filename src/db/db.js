import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n MONGODB connected !! DB HOST ${connectionInstance.connection.host}`);

        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err,data){
            const food_category = await mongoose.connection.db.collection("food_category");
            food_category.find({}).toArray(function(err,catData){
                if(err) console.log(err);
                else{
                    global.food_items = data;
                    global.food_category = catData;
                }
            })
        })

    }catch(error){
        console.log("MONGODB connection Failed!!!", error);
        process.exit(1);
    }
}

export default connectDB;
