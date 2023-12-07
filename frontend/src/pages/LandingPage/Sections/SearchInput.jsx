import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";

const SearchInput = ({ setSearch, onSearch, searchTerm }) => {

  const clickHandler = () => {
    onSearch();
  }
  return (
    <>
    <input 
      className='p-2 px-6 border border-gray-300 rounded-full w-full bg-gray-100'
      type='text'
      placeholder='검색하세요.'
      onChange={(e) => setSearch(e.target.value)}
      value={searchTerm}
      />
    <div 
      className='text-gray-700 text-3xl flex items-center pl-3 cursor-pointer'
      onClick={clickHandler}
      >
      <IoSearch />
    </div>
    </>
  )
}

export default SearchInput
