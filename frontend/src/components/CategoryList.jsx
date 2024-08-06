import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategoryProducts() {
    try {
      setLoading(true);
      const resp = await axios.get("/api/get-category-product");
      setCategoryProduct(resp.data.data);
      console.log(resp.data);
      setLoading(false);
    } catch (error) {
      console.log("error ", error);
    }
  }

  const categoryLoading = new Array(9).fill(null)

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  function onProductUpdate() {
    fetchCategoryProducts();
  }

  return (
    <div className="sm:h-[10vh] md:h-[12vw] bg-slate-300 ">
      {loading ? (
        <div className="flex items-center justify-evenly gap-5 py-2 shadow-md  transition-all duration-300 w-full overflow-x-scroll">
          {categoryLoading.map((item, index)=>{
            return (
              <div
                key={index+"Item"}
                className="w-[8vw] h-[8vw] rounded-full overflow-hidden bg-slate-600 flex items-center justify-center shadow-lg hover:shadow-gray-400 transition-all duration-500  mx-auto"
              >
                <LoadingSpinner size={12} color={"orange-500"} />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex items-center justify-evenly gap-5 py-2 shadow-md  transition-all duration-300 w-full overflow-x-scroll scrollbar-hidden">
          {categoryProduct.map((item) => (
            <Link
              to={"/product-category/" + item?.category}
              key={item._id}
              className="flex flex-col justify-center"
            >
              <div className="w-[8vw] h-[8vw] rounded-full overflow-hidden flex items-center justify-center shadow-md shadow-stone-600 hover:shadow-xl hover:shadow-black transition-all duration-500 bg-white mx-auto">
                <img
                  src={item?.productImage[0]}
                  alt={item?.productName}
                  className="h-full object-scale-down object-center hover:scale-125 transition-all duration-300 "
                />
              </div>
              <p className="text-center text-black font-semibold capitalize mt-1 text-xs sm:text-xs transition-none md:text-md">
                {item?.category}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryList;
