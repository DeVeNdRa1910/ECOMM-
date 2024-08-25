import React, { useEffect, useState } from "react";
import displayInrCurrency from "../helper/displayCurrency";
import { Link } from "react-router-dom";
import { TiArrowRight } from "react-icons/ti";
import addToCartDB from "../helper/addToCart";
import removeFromCart from "../helper/removeFromCart";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { decrease, increase } from "../store/cartSliceNumber";
import { loadStripe } from "@stripe/stripe-js";

function Cart() {
  const dispatch = useDispatch();

  const [subTotal, setSubTotal] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const cart = useSelector((state) => state.cart);

  const addHandler = async (e, item) => {
    dispatch(add(item));
    dispatch(increase(1))
    await addToCartDB(e, item.productId);
    setRefresh((prev) => !prev);
  };

  const removeHandler = async (e, item) => {
    dispatch(remove(item.productId));
    dispatch(decrease(1))
    await removeFromCart(e, item.productId);
    setRefresh((prev) => !prev);
  };

  const [cartProducts, setCartProducts] = useState([]);

  async function fetchCartProducts() {
    const resp = await axios.get("/api/get-cart-products", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-token-here",
      },
    });

    const cartProductsDB = resp.data.data;
    setCartProducts(cartProductsDB);
  }

  useEffect(() => {
    fetchCartProducts();
  }, [refresh, cart]);


  useEffect(() => {
    // console.log(cartProducts);
    const priceBeforeCharges = cartProducts?.reduce((acc, curr) => {
      return acc + curr.totalPrice;
    }, 0);

    priceBeforeCharges ? setSubTotal(priceBeforeCharges) : setSubTotal(0);
  }, [cartProducts]);

  async function deleteProductHandler(id){
    try {
      const resp = await axios.post("/api/delete-product", {productId: id},{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      } )

      console.log(resp.data.message);
      
    } catch (error) {
      console.log(error);
    }
    setRefresh((prev) => !prev);
  }

  async function checkoutHandler() {

     // console.log("Stripe Public Key:", import.meta.env.VITE_STRIPE_PUBLIC_KEY);
     const stripePromise = await loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`)

    const resp = await axios.post('/api/checkout', { cartItems : cartProducts}, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    console.log(" Payment Response ", resp.data);

    if(resp.data?.id){
      stripePromise.redirectToCheckout({sessionId: resp.data.id})
    }

  }

  /* "You did not provide an API key. You need to provide your API key in the Authorization header, using Bearer auth (e.g. 'Authorization: Bearer YOUR_SECRET_KEY'). See https://stripe.com/docs/api#authentication for details, or we can help at https://support.stripe.com/." */

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-800 ">
      <h2 className="text-center sm:text-sm md:text-xl lg:text-3xl font-bold">
        ITEM'S IN YOUR CART
      </h2>
      <div className="w-[100vw] flex items-center justify-center ">
        <div className="w-[100vw] md:w-[90vw] md:mx-auto my-[3vh] md:my-[8vh] bg-white rounded-lg flex flex-col">
          {cartProducts?.map((item) => {
            return (
              <div
                key={item.productId}
                className="w-full flex flex-col sm:flex-row border-b border-stone-400"
              >
                <div className="flex flex-row w-full sm:w-[50%] p-3">
                  <div className="w-[30%] flex items-center justify-center">
                    <img
                      src={item.productImage[0]}
                      className="h-auto w-auto max-h-[100px] max-w-[100px] mix-blend-multiply rounded-lg"
                      alt=""
                    />
                  </div>
                  <div className="w-[70%] flex items-center pl-4">
                    <p className="text-justify text-sm md:text-lg lg:text-xl">
                      {item.productName}
                    </p>
                  </div>
                </div>
                <div className="flex w-full md:w-[50%] py-3 justify-between">
                  <div className="w-[45%] flex flex-col items-center justify-center">
                    <div className="flex items-center">
                      <button
                        className="text-white p-1 md:p-2 bg-green-600 font-bold rounded-l-md"
                        onClick={(e) => addHandler(e, item)}
                      >
                        <FaPlus />
                      </button>
                      <span className="h-full text-md md:text-lg font-semibold px-4 flex items-center bg-slate-200">
                        {item.quantity}
                      </span>
                      <button
                        className="text-white p-1 md:p-2 bg-red-600 font-bold rounded-r-md"
                        onClick={(e) => removeHandler(e, item)}
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                  <div className="w-[45%] flex items-center justify-center">
                    <p className="text-center text-lg font-semibold">
                      {displayInrCurrency(item.quantity * item.sellingPrice)}
                    </p>
                  </div>
                  <div className="w-[8%] h-full bg-white hover:bg-red-600 text-red-600 hover:text-white text-xl flex items-center justify-center cursor-pointer "
                    onClick={()=>deleteProductHandler(item.productId)}
                  >
                    <RiDeleteBin6Fill />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="w-[90%] sm:w-[80%] mx-auto mb-8 mt-[10vh] bg-slate-200 rounded-xl">
            <div className="p-[5vh] sm:p-[10vh]">
              <div className="border-b border-slate-300 flex items-center justify-between py-3 text-sm sm:text-sm font-semibold">
                <h2 className="w-[50%]">Subtotal</h2>
                <span className="mr-2">{displayInrCurrency(subTotal)}</span>
              </div>
              <div className="border-b border-slate-300 flex items-center justify-between py-3 text-sm sm:text-sm font-semibold">
                <h2 className="">
                  Shipping Charges{" "}
                  <span className="text-xs sm:text-sm font-normal">
                    (Enjoy Free Shipping on Orders Over ₹1000!)
                  </span>
                </h2>
                <span className="mr-2">
                  {displayInrCurrency(
                    subTotal > 1000 ? 0 : 40
                  )}
                </span>
              </div>
              <div className="border-b border-slate-300 flex items-center justify-between py-3 text-sm sm:text-sm font-semibold">
                <h2 className="w-[50%]">Tax (CGST+SCGT)</h2>
                <span className="mr-2">
                  {displayInrCurrency(Math.floor(subTotal * 0.18))}
                </span>
              </div>
              <div className="border-b border-slate-300 flex items-center justify-between py-3 text-sm sm:text-sm font-semibold">
                <h2 className="w-[50%]">Order Total</h2>
                <span className="mr-2">
                  {displayInrCurrency(
                    Math.floor(subTotal * 0.18) +
                      subTotal +
                      (subTotal > 1000 ? 0 : 40)
                  )}
                </span>
              </div>
              <div className="rounded-lg border-2 border-orange-500 mt-[5vh] sm:mt-[10vh] ">
                <button
                  onClick={checkoutHandler}
                  className="w-full py-2 bg-orange-600 hover:bg-orange-500 active:scale-95 rounded-lg text-white text-sm sm:text-xl font-semibold font-mono border-2 border-white"
                >
                  Checkout
                </button>
              </div>
              <div className="w-full mt-4 text-center">
                <Link
                  to={"/"}
                  className="text-orange-600 hover:text-orange-400 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <p className="text-black">or</p>
                  <span>Continue Shopping</span>
                  <p className="-ml-2 text-xl py-1">
                    <TiArrowRight />
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
