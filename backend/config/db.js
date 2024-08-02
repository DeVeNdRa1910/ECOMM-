import mongoose from 'mongoose'

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            serverSelectionTimeoutMS: 5000
        })
        console.log("connection is done")
    } catch (error) {
        console.log(error);
    }
}
