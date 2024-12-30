import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        if (mongoose?.connection?.readyState) {
            return;
        }
        console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
        });
        console.log("connected to db");
    } catch (error) {
        console.log("🚀 ~ connectToDatabase ~ error:", error)
    }
}