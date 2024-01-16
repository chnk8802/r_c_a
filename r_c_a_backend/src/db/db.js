import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB@${con.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit();
    }
}