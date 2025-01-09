import mongoose from "mongoose";
const uri =
  "mongodb+srv://jamilyasir111:12qwaszx@cluster0.79tug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
export const ConnectDB = async () => {
   if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully.");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error; // Optional: re-throw to stop execution if needed
    }
  }
};
