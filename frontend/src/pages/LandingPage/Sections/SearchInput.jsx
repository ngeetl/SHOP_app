import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";

const SearchInput = ({ setSearch, onSearch, searchTerm }) => {

  const clickHandler = () => {
    onSearch();
  }

  const enterHandler = (e) => {
    if(e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <>
    <input 
      className='p-3 px-6 border border-gray-300 rounded-full w-full
       bg-gray-100 focus:outline-none focus:ring mb-2'
      type='text'
      placeholder='찾으시는 중고 제품을 검색하세요.'
      onChange={(e) => setSearch(e.target.value)}
      onKeyUp={enterHandler}
      value={searchTerm}
      />
    <div 
      className='text-gray-500 text-3xl flex items-center pl-3 
        cursor-pointer hover:text-purple-700 duration-200'
      onClick={clickHandler}
      >
      <IoSearch />
    </div>
    </>
  )
}

export default SearchInput
