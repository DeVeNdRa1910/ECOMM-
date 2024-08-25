import { Product } from "../../src/models/product.model.js";

export async function getProduct(req, res) {
    try {
        const productId = req.query.productId || req.body.productId; 

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            data: product,
            message: "Product fetched successfully",
            success: true,
            error: false
        });

    } catch (error) {
        res.status(500).json({
            message: "Fetching product details failed",
            error: true,
            success: false
        });
    }
}

