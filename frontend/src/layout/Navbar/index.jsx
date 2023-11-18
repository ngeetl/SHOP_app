import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavItem from './Sections/NavItem';

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMeun = () => {
    setMenu(prev => !prev);
  } 

  return (
    <section className='relative z-10 bg-orange-500 text-white'>
      <div className='w-full'>
        
        <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
          {/* logo */}
          <div className='flex items-center text-3xl h-16 font-semibold'>
            <Link to="/">Logo</Link>
          </div>
          {/* menu button */}
          <div className='text-2xl sm:hidden'>
            <button onClick={handleMeun}>{menu ? "-" : "+"}</button>
          </div>
          {/* big screen nav-items */}
          <div className='hidden sm:block'>
            <NavItem />
          </div>
        </div>


        {/* mobile nav-items */}
        <div className='block sm:hidden'>
          {menu && <NavItem />}
        </div>

      </div>
    </section>
  )
}

export default Navbar
