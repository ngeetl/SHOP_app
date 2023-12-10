import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axios';
import ProductImage from './sections/ProductImage';
import ProductInfo from './sections/ProductInfo';

const DetailProductPage = () => {
  
  const { productId } = useParams(); // 객체를 반환하기 때문에 디스트럭쳐링
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axiosInstance.get(`/products/${productId}?type=single`);
        setProduct(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct();
  }, [productId]);

  // product가 fetch되기 전 뜨는 오류 해결
  if(!product) return null;

  return (
    <section>

      {/* Detail */}
      <div className='flex gap-12 my-[130px]'>

          {/* ProductImage */}
          <div className='w-[40%] mr-10'>
            <ProductImage product={product} />
          </div>

          {/* ProductInfo */}
          <div className='w-[55%] h-full'>
            <ProductInfo product={product} />
          </div>

      </div>
    </section>
  )
}

export default DetailProductPage
