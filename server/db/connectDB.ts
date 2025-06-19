import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI!);
    console.log("Mongodb connected successfully :) ");
  } catch (error) {
    console.log("Error while connecting database : ",error);
  }
};

export default connectDB;