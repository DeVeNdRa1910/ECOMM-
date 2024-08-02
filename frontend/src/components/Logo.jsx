import React from 'react'
import logoImage from '../assest/Dlogo.png'
import { Link } from 'react-router-dom'
function Logo() {
  return (
    <Link to={'/'}>
      <img 
        src={logoImage} 
        className='rounded-full h-[7vh] w-[7vh]  active:scale-95' 
        alt="Logo" 
      />
    </Link>
  )
}

export default Logo
