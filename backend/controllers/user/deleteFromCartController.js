import { cartProduct } from "../../models/cartProduct.js";

export default async function removeFromCartController(req, res) {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        // Check if the product is in the cart for the current user
        const existingProduct = await cartProduct.findOne({ productId, userId: currentUser });

        if (!existingProduct) {
            // If the product is not in the cart, send an error response
            return res.status(404).json({
                message: "Product not found in your cart",
                success: false,
                error: true,
            });
        }

        if (existingProduct.quantity > 1) {
            // If quantity is more than 1, decrease it by 1
            existingProduct.quantity -= 1;
            const updatedProduct = await existingProduct.save();

            return res.json({
                data: updatedProduct,
                message: "Product quantity decreased in your cart",
                success: true,
                error: false,
            });
        }

        // If quantity is 1, remove the product from the cart
        await cartProduct.deleteOne({ productId, userId: currentUser });

        return res.json({
            message: "Product removed from your cart",
            success: true,
            error: false,
        });

    } catch (error) {
        return res.status(500).json({
            message: error?.message || error,
            error: true,
            success: false,
        });
    }
}
