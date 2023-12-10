import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/thunkFunctions';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const NavItem = ({ mobile }) => {
    const routes = [
        {to: '/login', name: 'Login', auth: false},
        {to: '/register', name: 'Register', auth: false},
        {to: '/product/upload', name: 'Upload', auth: true},
        {to: '/history', name: 'History', auth: true},
        {to: '', name: 'Logout', auth: true},
        {to: '/user/cart', name: '장바구니', auth: true, icon: <AiOutlineShoppingCart style={{ fontSize: '1.4rem' }} />},
    ]

    const cart = useSelector(state => state.user?.userData?.cart);
    const isAuth = useSelector(state => state.user?.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => {
                navigate('/login');
            })
    };

  return (
    <ul className={`text-2xl flex justify-center items-center w-full gap-4 ${mobile && 'flex-col bg-orange-500'}`}>
        {routes.map(({ to, name, auth, icon }) => {
            // isAuth와 auth가 일치하지 않는 것은 아예 보이지 않게 만듦
            if(isAuth !== auth) return null;

            // isAuth와 auth가 일치하였다면 보여지게 하고, 속성이 달라짐
            if(name === 'Logout') {
                return (
                    <li key={name} className='py-2 text-center cursor-pointer'>
                        <Link onClick={handleLogout}>{name}</Link>
                    </li>
                )
            } else if(name === '장바구니') {
                return <li className='relative py-2 text-center cursor-pointer pr-1' key={name}>
                    <Link to={to}>
                        {icon}
                        {cart?.length > 0 ? <span className='absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white
                            bg-orange-400 border-2 border-white rounded-full -right-2'>
                            {cart?.length}
                        </span> : null}
                    </Link>
                </li>
            }
            
            else {
                return (
                    <li key={name} className='py-2 text-center cursor-pointer'>
                        <Link to={to}>{name}</Link>
                    </li>
                )
            }
        })}
    </ul>
  )
}

export default NavItem
