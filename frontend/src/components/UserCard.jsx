import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import AdminEditProduct from "./AdminEditProduct";
import displayInrCurrency from "../helper/displayCurrency";

function UserCard({data, onProductUpdate }) {
  const [editProduct, setEditProduct] = useState(false);

  
  return (
    <>
      <div className=" w-[16vw] h-[62vh] mx-auto rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-orange-700 card glass">
        <div className="w-full h-[30vh] relative">
          <img
            src={data?.productImage[0]}
            alt={data?.productName}
            className="w-full h-[30vh] object-cover object-top rounded-md"
          />
        </div>
        <div className=" p-2 flex flex-col ">
          <h3 className="my-0.5 text-lg font-semibold text-white line-clamp-2">{data?.productName}</h3>
          <div className="mt-1 text-red-500 flex flex-col">
            <span className="line-through">{displayInrCurrency(data?.price)}</span>
            <span className="text-green-600 font-bold">{displayInrCurrency(data?.sellingPrice)}</span>
          </div>
          <button
            onClick={()=>setEditProduct(true)}
            className="mt-4 flex items-center justify-center w-auto px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-500 transition-colors duration-300 fixed bottom-2 left-2 right-2" 
          >
            Add To Cart
          </button>
        </div>
      </div>
      {editProduct && <AdminEditProduct onClose={()=>setEditProduct(false)} productData={data} onProductUpdate={onProductUpdate}/>
      }
    </>
  );
}

export default UserCard
