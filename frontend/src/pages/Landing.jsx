import React, { useEffect, useState } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import UserProducts from '../components/UserProducts'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { add } from '../store/cartSlice'

function Landing() {
  const dispatch = useDispatch()

  

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-200">
      <CategoryList />
      <BannerProduct />
      <UserProducts/>
    </div>
  )
}

export default Landing
