import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import axios from 'axios'
import AdminProductCard from '../components/AdminProductCard'


function Products() {

  const [openUploadProducts, setOpenUploadProducts] = useState(false)

  const [allProducts, setAllProducts] = useState([])

  async function fetchProducts(){
    const resp = await axios.get('/api/get-products')

    // console.log(resp.data.data);
    setAllProducts(resp.data.data || [])

  } 

  useEffect(()=>{
    fetchProducts()
    console.log(allProducts);
  }, [openUploadProducts])


  const menuToggler = useCallback(()=>{
    setOpenUploadProducts(prev=>!prev)
  },[openUploadProducts])

  const onProductUpdate = () => {
    fetchProducts();
  };

  return (
    <div className=''>
      <div className='text-orange-500 flex items-center justify-between px-4 py-3 rounded-lg shadow-md shadow-orange-500'>
        <h1 className='block mx-auto text-xl font-bold'>All Producs</h1>
        <button 
          className='px-4 py-0.5 bg-orange-500 text-white hover:bg-black hover:text-orange-500 font-semibold rounded-lg transition-all active:scale-95 border border-black hover:border-orange-500'
          onClick={menuToggler}
        >Add new Product</button>
      </div>


      {/* All Product */}

      <div className='flex flex-wrap justify-evenly gap-5 p-4 mt-2 rounded-xl shadow-md bg-black transition-all duration-300'>
        {
          allProducts?.map(item=>(
            <div key={item._id}>
              <AdminProductCard data={item} onProductUpdate={onProductUpdate}/>
            </div>
          ))
        }
      </div>


      {/* update Products */}
      {
        openUploadProducts && (
          <UploadProduct onClose={menuToggler}  />
        )
      }
    </div>
  )
}

export default Products
