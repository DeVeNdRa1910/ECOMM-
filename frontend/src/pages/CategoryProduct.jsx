import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BannerProduct from '../components/BannerProduct'
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import Card from '../components/Card';
import HorizontalCardProducts from '../components/HorizontalCardProducts';

function CategoryProduct() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const paramsObj = useParams();
  // console.log(paramsObj);
  
  const {categoryName} = useParams();
  const selectedCategory = categoryName.substring(1);

  async function fetchData(category) {
    setLoading(true);
    try {
      const resp = await axios.post('/api/category-product', {
        category: category
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(resp.data);
      setData(resp.data.data);
    } catch (error) {
      console.error("Error fetching category-wise products:", error);
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchData(categoryName.substring(1))
  },[])

  console.log(data);
  

  return (
    <div className='bg-gradient-to-r from-blue-900 to-blue-300 min-h-screen'>
      <div className='shadow-xl pt-2'>
        <BannerProduct />
      </div>

      <div>
        <HorizontalCardProducts category={selectedCategory} heading={selectedCategory}/>
      </div>

      <div className='my-[10vh] pb-[10vh] h-full w-full flex items-center justify-center' >
        { loading ? (
          <div className=' mt-[12vh]'>
            <LoadingSpinner size={8} color={'blue-800'}/>
          </div>
          ) : (
            <div className='flex flex-wrap  px-4 gap-[2.5vw] justify-evenly overflow-y-scroll scrollbar-hidden'>
              {
                data.map(item=>(
                  <div key={item._id}>
                    <Card data={item} />
                  </div>
                ))
              }
            </div>
          )}
      </div >
    </div>
  )
}

export default CategoryProduct
