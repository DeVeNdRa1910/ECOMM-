import React, { useEffect, useState } from "react";
import displayInrCurrency from "../helper/displayCurrency";
import { Link } from "react-router-dom";
import { TiArrowRight } from "react-icons/ti";
import addToCartDB from "../helper/addToCart";
import removeFromCart from '../helper/removeFromCart';
import axios from "axios";

function Cart() {
  const [subTotal, setSubTotal] = useState(0);


  const addHandler = async (e, item) => {
    // console.log(item);

    await addToCartDB(e,item.productId)

  };

  const removeHandler = async (e,item) => {

    await removeFromCart(e,item.productId)

  };

  /* 
   const cartObj = {
      id: data?._id,
      productName: data?.productName,
      image: data?.productImage[0],
      quantity: 1,
      price: data?.sellingPrice
    }
  */

    const [cartProducts, setCartProducts] = useState([]);

    async function fetchCartProducts(){
      const resp = await axios.get('/api/get-cart-products',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-token-here',
          },
        })

      const cartProductsDB = resp.data.data
      console.log(cartProductsDB);
      setCartProducts(cartProductsDB)
    }

    useEffect(()=>{
      fetchCartProducts()
    },[])

  useEffect(() => {
    const priceBeforeCharges = cartProducts.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);

    setSubTotal(priceBeforeCharges);
  }, [cartProducts]);

  function chechoutHandler(){
    alert("Thnkyou for shopping")
  }

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-800">
      <h2 className="text-center text-5xl font-bold">ITEM'S IN YOUR CART</h2>
      <div className="w-[100vw] flex items-center justify-center ">
        <div className=" w-[90vw] my-[10vh] px-8 bg-white rounded-lg flex flex-col">
          {cartProducts.map((item) => {
            return (
              <div
                key={item.productId}
                className="w-full flex items-center justify-between border-b border-stone-400"
              >
                <div className="w-[50vh] h-[25vh] p-3 flex items-center justify-center">
                  <img
                    src={item.productImage[0]}
                    className="h-full w-auto mix-blend-multiply rounded-lg"
                    alt=""
                  />
                </div>
                <div className="w-[50vh] h-[25vh] m-2 p-2 flex items-center">
                  <p className="text-justify line-clamp-3">
                    {item.productName}
                  </p>
                </div>
                <div className="w-[25vh] h-[25vh] flex items-center justify-center">
                  <div>
                    <p className="text-center">
                      Quantity:{" "}
                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>
                    </p>
                    <div className="py-4">
                      <button
                        className="text-green-600 mr-3 font-bold"
                        onClick={(e) => addHandler(e,item)}
                      >
                        Add
                      </button>
                      <button
                        className="text-red-600 ml-3 font-bold"
                        onClick={(e) => removeHandler(e,item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-[20vh] h-[25vh] flex items-center justify-center">
                  <div>
                    <p className="text-center text-lg font-semibold">
                      {displayInrCurrency(item.quantity * item.price)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className=" w-[80%] mx-auto mb-8 mt-[15vh] bg-slate-200 rounded-xl">
            <div className="p-[10vh]">
              <div className="border-b border-slate-300 flex items-center justify-between py-3 text-lg font-semibold">
                <h2 className="w-[50%]">Subtotal</h2>
                <span className=" mr-2">{displayInrCurrency(subTotal)}</span>
              </div>
              <div className="border-b border-slate-300 flex items-center justify-between py-3 text-lg font-semibold">
                <h2 className="">
                  Sipping Charges{" "}
                  <span className="text-xs font-normal">
                    (Enjoy Free Shipping on Orders Over ₹10,000!)
                  </span>
                </h2>
                <span className=" mr-2">
                  {displayInrCurrency(subTotal > 10000 ? 0 : Math.floor(subTotal * 0.05))}
                </span>
              </div>
              <div className="border-b border-slate-300 flex items-center justify-between py-3 text-lg font-semibold">
                <h2 className="w-[50%]">Tax (CGST+SCGT)</h2>
                <span className=" mr-2">{displayInrCurrency(Math.floor(subTotal * 0.18))}</span>
              </div>
              <div className="border-b border-slate-300 flex items-center justify-between py-3 text-lg font-semibold">
                <h2 className="w-[50%]">Order Total</h2>
                <span className=" mr-2">
                  {displayInrCurrency(Math.floor(subTotal * 0.18) +
                    subTotal +
                    (subTotal > 10000 ? 0 : Math.floor(subTotal * 0.05)))}
                </span>
              </div>
              <div className="rounded-lg border-2 border-orange-500 mt-[10vh] ">
                <button 
                  onClick={chechoutHandler}
                  className="w-full py-2 bg-orange-600 hover:bg-orange-500 active:scale-95 rounded-lg text-white text-xl font-semibold font-mono border-2 border-white">
                  Checkout
                </button>
              </div>
              <div className="w-full mt-4 text-center">
                <Link
                  to={"/"}
                  className="text-orange-600 hover:text-orange-400 flex items-center justify-center gap-2"
                > 
                  <p className="text-black">or</p>
                  <span>Continue Shopping</span>
                  <p className="-ml-2 text-xl py-1"><TiArrowRight /></p>
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