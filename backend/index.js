import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from './config/db.js'
import router from "./routes/index.js";


configDotenv()

const app = express();
app.use(express.json())
app.use(cors())
app.use("/api", router)

const PORT = 5050 || process.env.PORT

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Your server running on ${PORT}`);
  })
})

