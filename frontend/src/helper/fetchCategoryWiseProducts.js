import axios from "axios";
import { toast } from "react-toastify";

async function fetchCategoryWiseProducts(category){
  try {
    const resp = await axios.post('/api/category-product', {
      category: category
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching category-wise products:", error);
    toast.error("something went wrong");
    throw error;
  }
}

export default fetchCategoryWiseProducts;