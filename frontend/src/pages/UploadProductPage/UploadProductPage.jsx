import React from 'react';

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
  return (
    <section>
        {/* 타이틀 */}
        <div className='text-center m-7'>
          <h1>예상 상품 업로드</h1>
        </div>
        
        {/* 업로드 양식 */}
        <form className='mt-6'>
          <div className='mt-4'>
            <label htmlFor='title'>이름</label>
            <input className='w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2' 
              name='title' id='title'/>
          </div>
          <div className='mt-4'>
            <label htmlFor='description'>설명</label>
            <input className='w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2' 
              name='description' id='description'/>
          </div>
          <div className='mt-4'>
            <label htmlFor='price'>가격</label>
            <input className='w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2' 
              name='price' id='price' type='number'/>
          </div>
          <div className='mt-4'>
            <label htmlFor='continents'>지역</label>
            <select className='w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2'
              name='continents' id='continents'>
              {continents.map(continent => (
                <option key={continent.value} value={continent.key}>{continent.value}</option>
              ))}
            </select>
          </div>
          
          {/* 버튼 */}
          <div className='mt-4'>
            <button className='w-full px-4 py-2 mt-4 text-white bg-black rounded-md hover:bg-orange-700'>
              생성하기
            </button>            
          </div>
        </form>

    </section>

  )
}

export default UploadProductPage
