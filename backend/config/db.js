import mongoose from 'mongoose'

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connection is done")
    } catch (error) {
        console.log(error);
    }
}
