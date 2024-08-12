import axios from "axios";
import { toast } from "react-toastify";

async function addToCartDB(e, id) {
  e.stopPropagation();
  e.preventDefault();

  try {
    const resp = await axios.post("/api/addToCart", { productId: id },{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //console.log(resp.data);
    
    const data = resp.data;
    if(data.success){
      toast.success(data.message)
    }
    
    if(data.success && data.error){
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

export default addToCartDB;
