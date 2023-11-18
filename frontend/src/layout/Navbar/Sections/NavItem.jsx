import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavItem = ({ mobile }) => {
    const routes = [
        {to: '/login', name: '로그인', auth: false},
        {to: '/register', name: '회원가입', auth: false},
        {to: '', name: '로그아웃', auth: true},
    ]

    const isAuth = useSelector(state => state.user?.isAuth);

    const handleLogout = () => {

    }

  return (
    <ul className={`text-md flex justify-center items-center w-full gap-4 ${mobile && 'flex-col bg-orange-500'}`}>
        {routes.map(({ to, name, auth }) => {
            // isAuth와 auth가 일치하지 않는 것은 아예 보이지 않게 만듦
            if(isAuth !== auth) return null;

            // isAuth와 auth가 일치하였다면 보여지게 하고, 속성이 달라짐
            if(name === '로그아웃') {
                return (
                    <li key={name} className='py-2 text-center hover:border-b-2 cursor-pointer'>
                        <Link onClick={handleLogout}>{name}</Link>
                    </li>
                )
            } else {
                return (
                    <li key={name} className='py-2 text-center hover:border-b-2 cursor-pointer'>
                        <Link to={to}>{name}</Link>
                    </li>
                )
            }
        })}
    </ul>
  )
}

export default NavItem
