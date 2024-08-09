import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import displayInrCurrency from "../helper/displayCurrency";
import LoadingSpinner from "./LoadingSpinner";
import fetchCategoryWiseProducts from "../helper/fetchCategoryWiseProducts";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { add } from '../store/cartSlice'

function ProductPage() {
  const { productId } = useParams();

  const [product, setProduct] = useState({
    productImage: [],
  });
  const [loading, setLoading] = useState(false);
  const [allCategoryProducts, setAllCategoryProducts] = useState([]);
  const [activeImage, setActiveImage] = useState([]);

  async function fetchProductData() {
    setLoading(true);
    try {
      const resp = await axios.get(`/api/product-details?productId=${productId}`);
      // console.log(resp.data.data);
      setProduct(resp.data.data);
      setActiveImage(resp.data.data?.productImage[0])
      const resp2 = await fetchCategoryWiseProducts(resp.data.data.category);
      setAllCategoryProducts(resp2.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const dispatch = useDispatch()

  function addToCart(e){
    e.stopPropagation();
    e.preventDefault();

    const cartObj = {
      id: product?._id,
      productName: product?.productName,
      image: product?.productImage[0],
      quantity: 1,
      price: product?.sellingPrice
    }

    dispatch(add(cartObj))
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-400 to-blue-950">
      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={8} />
        </div>
      ) : (
        <div className=" py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="rounded-lg bg-white py-5 mb-4 flex justify-center">
                  {product?.productImage.length > 0 && (
                    <img
                      className="w-auto h-auto max-h-[70vh] object-cover object-center"
                      src={activeImage}
                      alt=""
                    />
                  )}
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <button 
                      onClick={addToCart}
                    className="w-full text-lg bg-orange-500 hover:bg-orange-600 active:scale-95 text-white py-2 px-4 rounded-full font-semibold">
                      Add to Cart
                    </button>
                  </div>
                  <div className="w-1/2 px-2">
                    <button className="w-full text-lg bg-orange-500 hover:bg-orange-600 active:scale-95 text-white py-2 px-4 rounded-full font-semibold">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {product.productName}
                </h2>
                <div className="flex mb-4 text-xl font-medium">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Price :
                    </span>
                    <span className="text-red-600 dark:text-red-600 line-through ml-2">
                      {displayInrCurrency(product.price)}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      After Discount :
                    </span>
                    <span className="text-green-600 dark:text-green-300 ml-2 text-lg">
                      {displayInrCurrency(product.sellingPrice)}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-white">
                    Product Description :
                  </span>
                  <p className="text-gray-800 dark:text-gray-300 text-justify">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="my-[5vh] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {product?.productImage[0] && (
          <div className="relative w-full max-w-4xl overflow-x-auto">
            <div className="relative w-full max-w-full overflow-x-auto scrollbar">
              <div className="flex space-x-4 mx-[2vw]">
                {product?.productImage.map((image, index) => (
                  <div key={index} className="relative group flex-shrink-0">
                    <img
                      src={image}
                      alt={`Slide ${index}`}
                      className="w-[25vh] h-[25vh] hover:shadow-white hover:shadow-lg transition-all duration-500 object-cover rounded-lg my-5 "
                      onClick={()=>{setActiveImage(image)}}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <h2 className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-4xl font-mono font-semibold" >Related products</h2>

      <div className="flex items-center justify-center ml-[2vw] mt-[5vh] pb-[5vh]">
        <div className="flex flex-wrap px-4 gap-[2.5vw] justify-evenly ">
          {allCategoryProducts.map((item) => (
            <div key={item._id}>
              <Card data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
