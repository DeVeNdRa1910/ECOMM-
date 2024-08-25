import { uploadProductPermission } from "../../helper/permission.js";
import { Product } from "../../src/models/product.model.js";

export async function updateProductController(req, res){
    try {

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission Denied");
        }

        const {_id, ...restBody} = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(_id, restBody, { new: true });
        // { new: true } => it will return updated data 

        res.status(201).json({
            data: updatedProduct,
            message: "Product Details Updated",
            success: true,
            error: false
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}