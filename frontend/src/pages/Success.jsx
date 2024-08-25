import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

function Success() {
  useEffect(() => {
    gsap.from('.container', {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-400">
      <div className="container max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center transform transition-transform duration-500 hover:scale-125">
        <FaCheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">! Payment Successfull !</h1>
        <p className="text-gray-600 mb-4">Thank you for your order. We are processing it and will notify you once it's on its way.</p>
        <Link to="/orders" className="inline-block px-6 py-3 text-white bg-green-500 rounded-full shadow-md hover:bg-green-600 transition duration-300">
          See Orders
        </Link>
        <Link to='/home' className='block py-4 hover:text-green-800 font-semibold'><span>Continue Shopping</span></Link>
      </div>
    </div>
  );
}

export default Success
