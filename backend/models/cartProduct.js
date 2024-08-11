import { Product } from "./product.model.js";
import { User } from "./user.model.js";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export const cartProduct = mongoose.model("CartProducs", cartSchema);