import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Card from '../components/Card';

function SearchProductPage() {

  const query = useLocation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  console.log(query.search);

  async function fetchProducts(){
    setLoading(true)
    try {
      const resp = await axios.get("/api/search"+query.search)
      //console.log(resp.data);
      setProducts(resp.data.data)
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  useEffect(()=>{
    let timer = setTimeout(()=>{
      fetchProducts()
    },1000)

    return ()=>{
      clearTimeout(timer);
    }
  }, [query])

  return (
    <div className="w-full h-full flex items-center justify-center mx-auto my-[5vh] pb-[5vh] bg-gradient-to-b from-blue-800 to-white">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-[2.5vw] py-[5vh]">
          {products.map((item) => (
            <div key={item._id}>
              <Card data={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchProductPage
