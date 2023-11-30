import React, { useEffect, useState } from 'react'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SearchInput from './Sections/SearchInput'
import CardItem from './Sections/CardItem'
import axiosInstance from '../../utils/axios'
import { continents, prices } from '../../utils/filterData'

const LandingPage = () => {
  const limit = 4;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    continents: [],
    prices: []
  });

  useEffect(() => {
    fetchProducts({ skip, limit });
  }, []);


  console.log(filters)
  
  // 게시물을 불러오는 로직
  const fetchProducts = async ({ skip, limit, loadMore=false, filters={}, searchTerm=""}) => {
    const params = {
      skip, // 게시물이 시작되는 순서
      limit, // 게시물 마지막 순서
      filters,
      searchTerm
    };
    try {
      const response = await axiosInstance.get('/products', { params });

      if(loadMore) {
        setProducts([...products, ...response.data.products]);
      } else {
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    };
  }

  // 더보기 버튼 게시물 요청 로직
  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  // 필터 로직
  const handleFilters = (newFilteredData, category) => {
    const newFilters = {...filters};
    newFilters[category] = newFilteredData;

    if(category === "prices") {
      const priceValues = handlePrice(newFilteredData);
      newFilters[category] = priceValues
    };

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const handlePrice = (value) => {
    let array = [];

    for(let key in prices) {
      if(prices[key]._id === parseInt(value, 10)) {
        array = prices[key].array
      }
    }
    return array;
  };

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters
    };

    fetchProducts(body);
    setSkip(0);
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
          <CheckBox 
            continents={continents} 
            checkedContinents={filters.continents} 
            onFilters={filters => handleFilters(filters, "continents")}
          />
        </div>
        <div className='w-1/2 bg-red-100'>
          <RadioBox
            prices={prices}
            checkedPrice={filters.prices}
            onFilters={filters => handleFilters(filters, "prices")} />
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
          <button 
            className='bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out'
            onClick={handleLoadMore}>
            더 보기
          </button>
        </div>
      }

    </section>
  )
}

export default LandingPage
