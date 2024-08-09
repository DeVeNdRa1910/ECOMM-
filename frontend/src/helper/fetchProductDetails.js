import axios from "axios";
import { toast } from "react-toastify";

export async function fetchProductDetails(productId){
  try {
    const resp = await axios.get(`/api/product-details?productId=${productId}`);
    // console.log(resp.data.data);
    return resp.data.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    toast.error("Something went wrong");
  } 
}