import React, { useState } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";

const RadioBox = ({ prices, checkedPrice, onFilters }) => {
    // DropDown
    const [drop, setDrop] = useState(false);

  return (
    <div className='p-2'>
      <button 
      onClick={() => setDrop(prev => !prev)}
      className={`flex justify-between bg-white items-center font-semibold py-2 px-4 border border-gray-300
      border-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 duration-200 w-[150px]`}
      id={drop ? 'buttonSlide' : ''}>
        가격<RiArrowDownSLine />
      </button>
      <div className={`${drop ? `bg-white-100 border border-gray-200 w-[90%] scale-y-100 delay-[1s]` : `scale-y-0`} transform transition-transform origin-top 
          duration-200 ease-in-out rounded-3xl px-6 py-3`} >
        {prices.map(price => (
          <div 
            key={price._id}
            className={`${drop ? 'scale-y-100 delay-[1.1s]' : 'scale-y-0 hidden'} p-1`}
          >
            <input 
              id={price._id}
              value={price._id}
              type='radio'
              checked={checkedPrice === price.array}
              onChange={e => onFilters(e.target.value)} 
              />
            {" "}
            <label htmlFor={price._id}>{price.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RadioBox
