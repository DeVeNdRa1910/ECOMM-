import { Product } from "../../models/product.model.js"

export async function getCategoryWiseProduct(req, res){
    try {

        const { category } = req?.body || req?.query
        const products = await Product.find({category})

        res.status(200).json({
            data: products,
            message: "Products fetched successfully",
            error: false,
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}