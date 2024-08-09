import React from "react";
import displayInrCurrency from '../helper/displayCurrency';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from '../store/cartSlice'

function Card({data}) {

  const dispatch = useDispatch()

  function addToCart(e){
    e.stopPropagation();
    e.preventDefault();

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
      <div className="bg-gradient-to-b from-slate-600  to-white w-[20vw] h-[56vh] mx-auto rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-orange-700 card glass">
        <Link to={'/product-page/' + data?._id}>
          <div className="w-full h-[30vh] py-[2vh] relative flex justify-center">
            <img
              src={data?.productImage[0]}
              alt={data?.productName}
              className="w-auto h-[30vh] object-cover object-center rounded-md"
            />
          </div>
          <div className=" p-2 flex flex-col ">
            <h3 className="my-0.5 text-lg font-semibold text-black line-clamp-2">{data?.productName}</h3>
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
