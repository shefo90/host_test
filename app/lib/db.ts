import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URI; // Make sure this is exactly the name in Vercel

if (!MONGO_URL) {
  throw new Error("Please define the MONGODB_URI environment variable in Vercel");
}

let isConnected = false;

export default async function connect() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(MONGO_URL!);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}
