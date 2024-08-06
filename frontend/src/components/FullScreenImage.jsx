import React, { memo } from 'react'
import { CgClose } from 'react-icons/cg'

function FullScreenImage({imgUrl, onClose}) {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
      <div className='bg-black shadow-lg rounded-lg max-w-5xl mx-auto p-4'>
        <div 
          className='w-fit ml-auto text-2xl text-white hover:text-orange-500 cursor-pointer'
          onClick={onClose}
        >
          <CgClose />
        </div>
        <div className='flex items-center justify-center p-4 max-w-[80vh] max-h-[80vh] object-cover'>
          <img src={imgUrl} className='w-full h-full' />
        </div>
      </div>
    </div>
  )
}

export default memo(FullScreenImage)
