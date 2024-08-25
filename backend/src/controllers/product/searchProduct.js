import { Product } from "../../src/models/product.model.js"

export async function searchProductController(req, res){
    try {
        const query = req.query.q

        const regex = new RegExp(query, 'i', 'g')

        const products = await Product.find({
            "$or":[
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        })

        res.json({
            data: products,
            error: true,
            success: false,
            message: "Search product List"
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}