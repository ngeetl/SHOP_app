import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems } from '../../store/thunkFunctions';

const CartPage = () => {

  const [totalPrice, setTotalPrice] = useState(0);
  const userData = useSelector(state => state.user?.userData);
  const cartDetail = useSelector(state => state.user?.cartDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    let cartItemIds = [];

    // userData에는 cart 최소한의 정보만 있기 때문에
    // userData cart에 있는 product들을 DB에서 정보를 불러오게 한 뒤
    // CartDetail state를 생성
    if(userData.cart.length > 0) {
      userData.cart.forEach(item => {
        cartItemIds.push(item.id);
      });

      const body = {
        cartItemIds,
        userCart: userData.cart
      };

      dispatch(getCartItems(body));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    calculateTotal(cartDetail);
  }, [cartDetail]);

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.map(item => total += item.price * item.quantity); 
    setTotalPrice(total);
  };
  
  return (
    <section>

        {/* Header */}
        <div className='text-center m-7'>
          <h2 className='text-2xl'>장바구니</h2>
        </div>

        {/* ProductList */}
        {cartDetail?.length > 0 ?
        <>
        <div className='mt-10'>
          <p><span className='font-bold'>합계: </span>{totalPrice}원</p>
          <button className='bg-blue-500 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl'>
            결제하기
          </button>
        </div>
        </>
        :
        <p>장바구니가 비었습니다.</p>
        }
    </section>
  )
}

export default CartPage
