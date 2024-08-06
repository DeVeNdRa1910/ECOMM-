import React from 'react'
import { useParams } from 'react-router-dom'

function CategoryProduct() {

  const {categoryName} = useParams()
  

  return (
    <div>
      {categoryName}
    </div>
  )
}

export default CategoryProduct
