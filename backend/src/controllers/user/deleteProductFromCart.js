import { cartProduct } from "../../src/models/cartProduct.js";

export async function deleteProductFromCartController(req, res) {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        const existingProduct = await cartProduct.findOne({ productId, userId: currentUser });

        if (!existingProduct) {
            // If the product is not in the cart, send an error response
            return res.status(404).json({
                message: "Product not found in your cart",
                success: false,
                error: true,
            });
        }

        await existingProduct.deleteOne();
        
        res.status(201).json({
            data: existingProduct,
            message: "product Successfully deleted",
            error: false,
            success: true 
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false 
        })
    }

}