import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from './config/db.js'
import router from "./routes/index.js";
import cookieParser from "cookie-parser";


configDotenv()

const app = express(); 
app.use(express.json({ limit: '10mb' }))  // post(or get) all data from DB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser()) // store the user data in client side (in cookie storage)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
})) // allow all browser to use this resource , you have to put frontend URL
app.use("/api", router)  // all routes are performing after "/api"+___ 

const PORT = 5050 || process.env.PORT


//Connect our server from DB
// first connect then listen app on PORT
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Your server running on ${PORT}`);
  })
})

