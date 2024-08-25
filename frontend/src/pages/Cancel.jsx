import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

function Cancel() {
  useEffect(() => {
    gsap.from('.container', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-200 to-red-800">
      <div className="container max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center transform transition-transform duration-500">
        <FaTimesCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">! Payment Decline !</h1>
        <p className="text-gray-600 mb-4">Your order was cancelled. If you have any questions, please contact support.</p>
        <Link to="/home" className="inline-block px-6 py-3 text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 transition duration-300">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default Cancel
