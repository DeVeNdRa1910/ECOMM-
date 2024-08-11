import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    productId : String,
    quantity : Number,
    userId : String,
},{timestamps: true})

export const cartProduct = mongoose.model("CartProducs", cartSchema);