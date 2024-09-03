import { cartProduct } from "../../models/cartProduct.js";
import { Product } from "../../models/product.model.js";

export default async function fetchCartProductsController(req, res) {
    try {
        const currentUser = req.userId;  // Assume req.userId has the logged-in user's ID

        // Fetch all cart products for the current user
        const cartItems = await cartProduct.find({ userId: currentUser }).populate({
            path: 'productId',
            select: 'productName productImage price sellingPrice' // Ensure these fields are in Product schema
        });

        if (cartItems.length === 0) {
            return res.json({
                message: "Your cart is empty",
                success: false,
                error: true,
            });
        }

        // Prepare response with all cart products and their details
        const cartDetails = cartItems.map(cartItem => ({
            productId: cartItem.productId._id,
            productName: cartItem.productId.productName,
            productImage: cartItem.productId.productImage,
            quantity: cartItem.quantity,
            price: cartItem.productId.price,
            sellingPrice: cartItem.productId.sellingPrice,
            totalPrice: cartItem.quantity * cartItem.productId.sellingPrice
        }));

        return res.json({
            data: cartDetails,
            message: "Cart products fetched successfully",
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
