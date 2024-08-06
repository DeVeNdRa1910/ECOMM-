import { uploadProductPermission } from "../../helper/permission.js";
import { Product } from "../../models/product.model.js"

export async function uploadProductController(req, res){
    try {
        const sessionUserId = req.userId;

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permision denied")
        }

        const uploadProduct = new Product(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            data: saveProduct,
            message: "Product Uploaded Successfully",
            error: false,
            success: true
        })

    } catch (error) {
       res.status(400).json({
        mesage: error.message || error,
        error: true,
        success: false,
       })
    }
}