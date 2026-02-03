import mongoose from "mongoose";
import { MONGODB_URI } from "../configs";

export const connectDb = async () => {
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
        // can use mongodb and query after this in your whole application
    }catch(e){
        console.error("MongoDB error: ", e);
        process.exit(1); // exit with failure
    }
}


export const connectDbTest = async () => {
    try{
        await mongoose.connect(MONGODB_URI + "_test");
        console.log("Connected to MongoDB");
        // can use mongodb and query after this in your whole application
    }catch(e){
        console.error("MongoDB error: ", e);
        process.exit(1); // exit with failure
    }
}
