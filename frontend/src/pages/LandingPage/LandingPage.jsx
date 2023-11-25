import React, { useEffect, useState } from 'react'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SearchInput from './Sections/SearchInput'
import CardItem from './Sections/CardItem'
import axiosInstance from '../../utils/axios'

const LandingPage = () => {

  const limit = 4;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const {filters, setFilters} = useState({
    continents: [],
    price: []
  });

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, []);

  const fetchProducts = async ({ skip, limit, loadMore=false, filters={}, searchTerm=""}) => {
    const params = {
      skip,
      limit,
      filters,
      searchTerm
    };
    try {
      const response = await axiosInstance.get('/products', { params });
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <section>
      
      {/* Header */}
      <div className='text-center m-7'>
        <h2 className='text-2xl'>여행 상품 사이트</h2>
      </div>

      {/* Filter */}
      <div className='flex gap-3'>
        <div className='w-1/2 bg-yellow-100'>
          <CheckBox />
        </div>
        <div className='w-1/2 bg-red-100'>
          <RadioBox />
        </div>
      </div>

      {/* Search */}
      <div className='flex justify-end bg-blue-100'>
        <SearchInput />
      </div>

      {/* Card */}
      <div className='grid grid-cols-2 sm:grid-cols-4 bg-green-100'>
        {products.map(product => 
          <CardItem product={product} key={product._id}/>
          )}
      </div>

      {/* LoadMore */}
      {hasMore &&
        <div className='flex justify-center mt-5'>
          <button className='bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out'>
            더 보기
          </button>
        </div>
      }

    </section>
  )
}

export default LandingPage
