import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import UserProducts from '../components/UserProducts'

function Landing() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-200">
      <CategoryList />
      <BannerProduct />
      <UserProducts/>
    </div>
  )
}

export default Landing
