import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
};

export default connectDB;
