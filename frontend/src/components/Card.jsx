import React from "react";
import displayInrCurrency from '../helper/displayCurrency';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from '../store/cartSlice'
import addToCartDB from "../helper/addToCart";

function Card({data}) {

  const dispatch = useDispatch()

  async function addToCart(e){
    e.stopPropagation();
    e.preventDefault();

    await addToCartDB(e,data?._id)

    const cartObj = {
      id: data?._id,
      productName: data?.productName,
      image: data?.productImage[0],
      quantity: 1,
      price: data?.sellingPrice
    }

    dispatch(add(cartObj))
  }

  return (
    <>
      <div className="bg-gradient-to-b from-slate-600  to-white w-[45vw] md:w-[30vw] lg:w-[20vw] sm:h-[40vh] md:h-[56vh] mx-auto rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-orange-700 card glass">
        <Link to={'/product-page/' + data?._id}>
          <div className="w-auto h-[18vh] md:h-[30vh] py-[2vh] relative flex justify-center">
            <img
              src={data?.productImage[0]}
              alt={data?.productName}
              className="w-auto h-[15vh] md:h-[30vh] object-cover object-center rounded-md"
            />
          </div>
          <div className=" h-[22vh] p-2 flex flex-col sm:text-xs mt-4 md:text-lg">
            <h3 className="my-0.5  font-semibold text-black text-sm line-clamp-2">{data?.productName}</h3>
            <div className="mt-1 text-red-500 flex justify-around">
              <span className="line-through">{displayInrCurrency(data?.price)}</span>
              <span className="text-green-600 font-bold">{displayInrCurrency(data?.sellingPrice)}</span>
            </div>
          </div>
        </Link>
        <button
          className="mt-4 flex items-center justify-center w-auto px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors duration-300 fixed bottom-2 left-2 right-2" 
          onClick={addToCart}
        >
          Add To Cart
        </button>
      </div>
    </>
  );
}

export default Card;
