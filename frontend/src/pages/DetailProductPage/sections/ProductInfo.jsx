import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../store/thunkFunctions';

const ProductInfo = ({ product }) => {
    const dispatch = useDispatch();

    const handelClick = () => {
        dispatch(addToCart({ productId: product._id }))
    };

  return (
    <div>
        <p>상품 정보</p>
        
        {/* Info */}
        <ul>
            <li><span className='font-semibold text-gray-900'>가격: </span> {product.price} 원 </li>
            <li><span className='font-semibold text-gray-900'>팔린 개수: </span> {product.sold} 개 </li>
            <li><span className='font-semibold text-gray-900'>설명: </span> {product.description} </li>
        </ul>
        
        {/* Button */}
        <div className='mt-3'>
            <button 
                className='bg-blue-500 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl'
                onClick={handelClick}>
                장바구니
            </button>
        </div>

    </div>
  )
}

export default ProductInfo
