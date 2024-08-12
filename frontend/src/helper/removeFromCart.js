import { toast } from "react-toastify";
import axios from "axios";


export default async function removeFromCart(e,productId){
  e.stopPropagation();
  e.preventDefault();
  
  try {
    const resp = await axios.post('/api/removeFromCart', {productId: productId},{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    // console.log(resp.data);
    const data = resp.data;
    toast.success(data.message)

  } catch (error) {
    toast.error(error.message)
  } 
  
}