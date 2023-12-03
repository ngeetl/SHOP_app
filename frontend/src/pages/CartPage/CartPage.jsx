import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems } from '../../store/thunkFunctions';

const CartPage = () => {

  const userData = useSelector(state => state.user?.userData);
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
  
  return (
    <div>
      CartPage
    </div>
  )
}

export default CartPage
