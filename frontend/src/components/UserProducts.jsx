import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Card from "./Card";
import LoadingSpinner from "./LoadingSpinner";

function UserProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAllProducts() {
    setLoading(true);
    try {
      const resp = await axios.get("/api/get-products");

      setAllProducts(resp.data.data || []);
      // console.log(resp.data.data);
    } catch (error) {
      toast.error("somthing went wrong shile fetching Producsts");
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAllProducts();
    // console.log(allProducts);
  }, []);

  return (
    <div className="flex items-center justify-center w-[90vw] mx-auto mt-[5vh] pb-[5vh]">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-[2.5vw] ">
          {allProducts.map((item) => (
            <div key={item._id}>
              <Card data={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProducts;
