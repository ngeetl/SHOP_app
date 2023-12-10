import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeItem } from '../../../store/thunkFunctions';
import { useNavigate } from 'react-router-dom';

const ProductInfo = ({ product }) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.user?.isAuth);
    const navigate = useNavigate();

    const handelClick = () => {
        if(auth) {
            dispatch(addToCart({ productId: product._id }));
        } else {
            navigate('/login');
        }
    };
    
    const deleteHandler = async () => {
        try {
            const answer = confirm('상품을 삭제하시겠습니까?');
            if(answer) {
                setTimeout(() => navigate('/'), 500);
                dispatch(removeItem({ productId: product._id }))
            }
        } catch (error) {
            console.log(error)
        }

    };

  return (
    <div>

        {/* Header */}
        <div className='pb-3 mb-5 border-b flex justify-between items-center'>
            <h1 className='text-3xl text-gray-500 font-[600]'>{product.title}</h1>
            <button
                className='px-2'
                onClick={deleteHandler}
            >
                {auth ? '✖️' : null}
            </button>
        </div>
        
        {/* Info */}
        <ul className='text-gray-800 flex flex-col gap-3 text-lg mt-8'>
            <li><span className='font-semibold'>가격: </span> {product.price} 원 </li>
            <li><span className='font-semibold'>팔린 개수: </span> {product.sold} 개 </li>
            <li><span className='font-semibold'>설명: </span> {product.description} </li>
        </ul>
        
        {/* Button */}
        <div className='mt-20 w-full flex justify-end'>
            <button 
                className='bg-blue-500 text-white text-lg font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl'
                onClick={handelClick}>
                장바구니
            </button>
        </div>

    </div>
  )
}

export default ProductInfo
