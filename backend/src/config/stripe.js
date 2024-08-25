import Stripe from "stripe";

console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

export const stripe =new Stripe('sk_test_51Pr0uuCjcurjK2OCcPsXFlv7AeL5d4PqwsOhuYW34MNmaCJZxdMMfcfbkih0RVTRzH44IZ012InKyAC8kqfAFQhe00L5lCVjbn');

