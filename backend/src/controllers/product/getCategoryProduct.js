import { Product } from "../../src/models/product.model.js"

export async function getCategoryProduct(req, res){
    try {
        const productsCategory = await Product.distinct("category")

        console.log("category",productsCategory);

        //array to store one product of each category 
        const productByCategory = []

        for (const category of productsCategory) {
            const product = await Product.findOne({category})
            if(product){
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            data: productByCategory,
            error: false,
            success: true,
            message: "here is the categories"
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}