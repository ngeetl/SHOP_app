import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';

const continents = [
  {key: 1, value: 'Africa'},
  {key: 2, value: 'Europe'},
  {key: 3, value: 'Asia'},
  {key: 4, value: 'North America'},
  {key: 5, value: 'South America'},
  {key: 6, value: 'Australia'},
  {key: 7, value: 'Antarctica'},
]

const UploadProductPage = () => {

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    continents: 1,
    images: []
  });

  const userData = useSelector(state => state.user?.userData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      // name에 대괄호를 치는 것은 변수의 값을 속성 이름으로 사용한다는 뜻
      [name]: value
    }))
  }; 

  const handleImages = (newImages) => {
    setProduct((prev) => ({
      ...prev,
      images: newImages
    }))
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      writer: userData.id,
      ...product
    }

    try {
      await axiosInstance.post('/products', body);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
        {/* 타이틀 */}
        <div className='text-center m-7'>
          <h1>예상 상품 업로드</h1>
        </div>
        
        {/* 업로드 양식 */}
        <form className='mt-6' onSubmit={handleSubmit}>

          <FileUpload images={product.images} onImageChange={handleImages} />

          <div className='mt-4'>
            <label htmlFor='title'>이름</label>
            <input className='w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2' 
              name='title' id='title' onChange={handleChange} value={product.title} />
          </div>
          <div className='mt-4'>
            <label htmlFor='description'>설명</label>
            <input className='w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2' 
              name='description' id='description' onChange={handleChange} value={product.description} />
          </div>
          <div className='mt-4'>
            <label htmlFor='price'>가격</label>
            <input className='w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2' 
              name='price' id='price' type='number' onChange={handleChange} value={product.price} />
          </div>
          <div className='mt-4'>
            <label htmlFor='continents'>지역</label>
            <select className='w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2'
              name='continents' id='continents' onChange={handleChange} value={product.continents} >
              {continents.map(continent => (
                <option key={continent.value} value={continent.key}>{continent.value}</option>
              ))}
            </select>
          </div>
          
          {/* 버튼 */}
          <div className='mt-8 flex justify-end'>
            <button type='submit' className='bg-blue-500 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-xl'>
              생성하기
            </button>            
          </div>
        </form>

    </section>

  )
}

export default UploadProductPage
