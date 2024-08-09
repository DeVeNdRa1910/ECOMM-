import { fetchProductDetails } from "./fetchProductDetails"
import { useDispatch } from "react-redux";
import { remove } from '../store/cartSlice'

export async function addToCart(productId){

  const dispatch = useDispatch()

  console.log("Making a object");
  
  // const productObj = await fetchProductDetails(productId)
  // console.log(productObj.data);

  dispatch(remove(productId))  
  
}