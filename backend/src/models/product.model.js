import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
},{timestamps: true})

export const Product = mongoose.model("Product", productSchema)