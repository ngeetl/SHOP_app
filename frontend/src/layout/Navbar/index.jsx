import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavItem from './Sections/NavItem';

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMeun = () => {
    setMenu(prev => !prev);
  } 

  return (
    <section className='bg-gradient-to-r from-blue-500 to-purple-500 p-5 text-white relative'>
      <div className='w-full'>
        
        <div id='font' className='font-medium flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
          {/* logo */}
          <div className='flex items-center text-5xl h-24 font-extrabold'>
            <Link to="/">FULL</Link>
          </div>
          {/* menu button */}
          <div className='text-3xl sm:hidden'>
            <button onClick={handleMeun}>{menu ? "-" : "+"}</button>
          </div>
          {/* big screen nav-items */}
          <div className='hidden sm:block'>
            <NavItem />
          </div>
        </div>


        {/* mobile nav-items */}
        <div className='block sm:hidden'>
          {menu && <NavItem mobile/>}
        </div>

      </div>
    </section>
  )
}

export default Navbar
