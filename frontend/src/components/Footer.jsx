import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Logo from './Logo'; // Make sure to import your Logo component
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black text-white p-5 shadow-top">
     
      <div >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <Logo />
            <span className="text-2xl text-orange-500 ml-2 font-bold">Dearcart</span>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link to="#" className="hover:underline hover:text-orange-500">About Us</Link>
            <Link to="#" className="hover:underline hover:text-orange-500">Contact</Link>
            <Link to="#" className="hover:underline hover:text-orange-500">Privacy Policy</Link>
            <Link to="#" className="hover:underline hover:text-orange-500">Terms of Service</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="#" className="hover:text-blue-500"><FaFacebookF /></Link>
            <Link to="#" className="hover:text-blue-400"><FaTwitter /></Link>
            <Link to="#" className="hover:text-pink-500"><FaInstagram /></Link>
            <Link to="#" className="hover:text-blue-700"><FaLinkedinIn /></Link>
          </div>
        </div>
        <div className="container mx-auto text-center mt-6">
          <p>&copy; 2024 Ecommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
