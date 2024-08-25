import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import UserProducts from '../components/UserProducts';
import HorizontalCardProducts from '../components/HorizontalCardProducts';

function Home() {

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-200 h-full">
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProducts category={"airdops"} heading={"Airpods"} />
      <HorizontalCardProducts category={"watches"} heading={"Watches"} />
      <UserProducts />
    </div>
  );
}

export default Home;
