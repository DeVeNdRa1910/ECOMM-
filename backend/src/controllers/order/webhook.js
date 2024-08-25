import { stripe } from "../../config/stripe";

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

export async function webhook(req, res){

    const sig = req.headers['stripe-signature'];

    let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)

}