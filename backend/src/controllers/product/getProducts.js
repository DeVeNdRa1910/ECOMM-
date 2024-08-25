import { Product } from "../../src/models/product.model.js";

export async function getProductsController(req, res){
    try {
        const allProducts = await Product.find().sort({createdAt : -1})
        // sort({createdAt : -1}) -> for sorting according to creation
        res.status(201).json({
            data: allProducts,
            message: "All Products",
            error: false,
            success: true
        })
    } catch (error) {
        res.status(401).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}