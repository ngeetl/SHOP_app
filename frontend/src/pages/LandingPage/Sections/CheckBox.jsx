import React, { useState } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";

const CheckBox = ({ category, checkedCategory, onFilters }) => {

  const handleToggle = (categoryId) => {
    // 현재 누른 checkbox가 이미 체크가 되어 있었는지 체크
    const currentIndex = checkedCategory.indexOf(categoryId);

    const newChecked = [...checkedCategory];

    if(currentIndex === -1) {
      newChecked.push(categoryId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked)
    onFilters(newChecked);
  };

  // DropDown
  const [drop, setDrop] = useState(false);

  return (
    <div className='p-2'>
      <button 
        onClick={() => setDrop(prev => !prev)}
        className={`flex justify-between bg-white items-center font-semibold py-2 px-4 border border-gray-300
        border-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 duration-200 w-[150px]`}
        id={drop ? 'buttonSlide' : ''}>
          카테고리<RiArrowDownSLine />
      </button>
      <div className={`${drop ? `bg-white-100 border border-gray-200 w-[90%] scale-y-100 delay-[1s]` : `scale-y-0`} transform transition-transform origin-top 
        duration-200 ease-in-out rounded-3xl px-6 py-3`} >
        {category?.map(category => (
          <div 
            key={category._id}
            className={`${drop ? 'scale-y-100 delay-[1.1s]' : 'scale-y-0 hidden'} p-1`}
            >
            <input 
              type='checkbox's
              checked={checkedCategory.indexOf(category._id) === -1 ? false :true}
              onChange={() => handleToggle(category._id)}/>{" "}
            <label>{category.name}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckBox
