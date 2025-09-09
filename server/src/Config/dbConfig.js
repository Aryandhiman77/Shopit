import mongoose from "mongoose";

export async function connectDB() {
  try {
    const instance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to Database: ${instance.connection.host}`);
  } catch (error) {
    console.log("Error Connecting to DB:", error);
    process.exit(1);
  }
}
