import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODV_URL;

export default async function connect(){
    if(mongoose.connection.readyState === 1){
        return console.log("already connected")
    }
    await mongoose.connect(MONGO_URL!)
    return console.log("connected")
}