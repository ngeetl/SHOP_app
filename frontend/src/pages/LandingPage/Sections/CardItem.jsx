import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';

const CardItem = ({ product }) => {
  return (
    <div className='border-gray-300 m-2 rounded-lg py-5'>
      <Link to={`/product/${product._id}`}>
        <ImageSlider images={product.images} />
        <div className=''>
          <p className='p-1 text-gray-700 text-lg font-semibold'>🪙{product.price?.toLocaleString()}원</p>
          <p className='text-gray-500 font-[600] p-1'>{product.title}</p>
        </div>
      </Link>
    </div>
  )
}

export default CardItem
