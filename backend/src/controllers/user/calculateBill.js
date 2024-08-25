import { cartProduct } from "../../src/models/cartProduct.js";
import { Product } from "../../src/models/product.model.js";

export default async function calculateBillController(req, res) {
    try {
        const currentUser = req.userId;

        // Fetch all products in the cart for the current user
        const cartProducts = await cartProduct.find({ userId: currentUser });

        if (cartProducts.length === 0) {
            return res.json({
                message: "Your cart is empty",
                success: false,
                error: true,
            });
        }

        let totalAmount = 0;

        for (let cartItem of cartProducts) {
            const product = await Product.findById(cartItem.productId);

            if (product) {
                // Calculate the price after discount (if applicable)
                const discount = product.price - product.sellingPrice;
                const finalPrice = product.sellingPrice * cartItem.quantity;

                totalAmount += finalPrice;
            }
        }

        return res.json({
            totalAmount,
            message: "Final bill calculated successfully",
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
