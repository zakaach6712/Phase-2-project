
import React from 'react';
import Slider from 'react-slick';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BannerCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,            
    cssEase: 'ease-in-out' 
  };

  const banners = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
    '/banner4.jpg',
    '/banner5.jpg',
    '/banner6.jpg',
    '/banner7.jpg',
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '1.5rem auto',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
      }}
    >
      <Slider {...settings}>
        {banners.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Banner ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
