import React from 'react';
import { Link } from 'react-router-dom';

const CardItem = ({ product, key}) => {
  return (
    <div className='border-[1px] border-gray-300 m-2'>
      <Link to={`/product/${product._id}`}>
        <p>{product.title}</p>
        <p>{product.continents}</p>
        <p className='p-1 text-xs text-gray-500'>{product.price}</p>
      </Link>
    </div>
  )
}

export default CardItem
