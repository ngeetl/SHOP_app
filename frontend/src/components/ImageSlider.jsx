import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageSlider = ({ images }) => {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop>
      {images.map(image => (
          <div key={image}>
            <img 
              src={`${import.meta.env.VITE_SERVER_URL}/${image}`} 
              alt={image}
              className='w-full h-full rounded-lg'/>
          </div>
      ))}
    </Carousel>
  )
}

export default ImageSlider
