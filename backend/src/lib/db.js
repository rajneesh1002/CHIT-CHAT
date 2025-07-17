import mongoose from 'mongoose';

export const connectDB=async()=>{
    try{
        const connectedAt= await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB connected: ${connectedAt.connection.host}`);
    }catch(error){
        console.log(`MongoDB connected eroor:`);

    }
}