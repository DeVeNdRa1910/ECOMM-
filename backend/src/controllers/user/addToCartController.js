import { cartProduct } from "../../models/cartProduct.js";

export default async function addToCartController(req, res) {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        // Check if the product is already in the cart for the current user
        const existingProduct = await cartProduct.findOne({ productId, userId: currentUser });

        if (existingProduct) {
            // If the product is already in the cart, increase the quantity by 1
            existingProduct.quantity += 1;
            const updatedProduct = await existingProduct.save();

            return res.json({
                data: updatedProduct,
                message: "Product quantity increased in your cart",
                success: true,
                error: false,
            });
        }

        // If the product is not in the cart, add it with quantity 1
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        };

        const newCartProduct = new cartProduct(payload);
        const saveProduct = await newCartProduct.save();

        return res.json({
            data: saveProduct,
            message: "Product added to your cart",
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
