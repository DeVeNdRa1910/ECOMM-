import React, { useState } from 'react'
import { useEffect } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'

function Home() {

  return (
    <div className="">
      <CategoryList />
      <BannerProduct />
    </div>
  )
}

export default Home
