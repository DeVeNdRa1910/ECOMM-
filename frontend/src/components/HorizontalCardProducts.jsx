import React, { useRef, useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import axios from "axios";
import displayInrCurrency from "../helper/displayCurrency";
import { toast } from "react-toastify";
import fetchCategoryWiseProducts from "../helper/fetchCategoryWiseProducts";
import { useDispatch, useSelector } from "react-redux";
import { add } from '../store/cartSlice'
import addToCartDB from "../helper/addToCart";
import { useNavigate } from "react-router-dom";
import { increase } from "../store/cartSliceNumber";

function HorizontalCardProducts({ category, heading }) {

  const dispatch = useDispatch()

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const scrollRef = useRef();

  async function fetchData(){
    setLoading(true);
    const resp = await fetchCategoryWiseProducts(category)
    console.log(resp.data);
    
    setData(resp.data)
    setLoading(false);
  }

  /* async function fetchData() {
    setLoading(true);
    try {
      const resp = await axios.post(
        "/api/category-product",
        {
          category: category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(resp.data);
      setData(resp.data.data);
    } catch (error) {
      console.error("Error fetching category-wise products:", error);
      toast.error("something went wrong");
    }
    setLoading(false);
  } */

  useEffect(() => {
    fetchData();
  }, []);

  function scrollRight() {
    scrollRef.current.scrollLeft += 300;
  }

  function scrollLeft() {
    scrollRef.current.scrollLeft -= 300;
  }

  const navigate = useNavigate()
  const user = useSelector(state=>state.user?.user)

  async function addToCart(e,data){
    e.stopPropagation();
    e.preventDefault();

    if(!user){
      toast.error("For use of Cart you have to login")
      navigate('/login')
      return;
    }

    await addToCartDB(e,data?._id)
  
    const cartObj = {
      id: data?._id,
      productName: data?.productName,
      image: data?.productImage[0],
      quantity: 1,
      price: data?.sellingPrice
    }
  
    dispatch(add(cartObj))
    dispatch(increase(1))
    
  }

  return (
    <div className="container mx-auto px-4 relative">
      <h2 className="text-2xl font-semibold py-4">Top <span className="capitalize">{heading}</span></h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-hidden transition-all"
        ref={scrollRef}
      >
        <button
          className="absolute bg-white shadow-md rounded-full p-1 left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="absolute bg-white shadow-md rounded-full p-1 right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[360px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-md shadow flex "
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product) => {
              return (
                <div
                  key={product?._id}
                  className="w-full min-w-[280px] md:min-w-[360px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-md shadow flex overflow-hidden "
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product?.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all"
                    />
                  </div>
                  <div className="p-4 mr-2 grid w-full gap-2">
                    <h2 className="font-medium text-sm md:text-lg text-ellipsis line-clamp-1 text-black p-1 rounded-full">
                      {product?.productName}
                    </h2>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full rounded-full">
                        {displayInrCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full rounded-full">
                        {displayInrCurrency(product?.sellingPrice)}
                      </p>
                    </div>
                    <button 
                    onClick={(e)=>{addToCart(e, product)}}
                    className="text-sm text-white px-3 py-0.5 rounded-full w-full bg-orange-500 hover:bg-orange-600 active:scale-95">Add to Cart</button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default HorizontalCardProducts;
