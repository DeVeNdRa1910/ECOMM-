import { stripe } from "../../config/stripe.js";
import { User } from "../../models/user.model.js";

export async function paymentController(req, res){
    try {
        const { cartItems } = req.body

        // console.log(cartItems); // aa raha hai

        const user = await User.findOne({_id: req.userId})

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate : 'shr_1PrG3oCjcurjK2OCk7RReum0'
                }
            ],
            customer_email: user.email,
            line_items: cartItems.map((item, index)=>{
                console.log(item.sellingPrice);
                return {
                    price_data:{
                        currency: 'inr',
                        product_data:{
                            name: item.productName,
                            images: item.productImage,
                            metadata: {
                                productId: item.productId
                            }
                        },
                        unit_amount: (item.sellingPrice+Math.floor((0.18*item.sellingPrice)+(item.sellingPrice > 10000 ? 0 : (0.05*item.sellingPrice))))*100
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }

        const session = await stripe.checkout.sessions.create(params);
        
          res.status(201).json(session);

    } catch (error) {
        res.json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
}