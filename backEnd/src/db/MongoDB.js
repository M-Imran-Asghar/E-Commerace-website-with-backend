import mongoose from "mongoose";



const connectDB = async () => {
    try {
        const connectInstanceDB = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDB connected successfully.!!! `);
        
    } catch (error) {
        console.log("mongodb connection Error ", error);
        
    }
}

export default connectDB