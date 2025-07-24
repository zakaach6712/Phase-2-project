import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BannerCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  const banners = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
    '/banner4.jpg'
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
     
      margin: '1.5rem auto',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      
    }}>
      <Slider {...settings}>
        {banners.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Banner ${index + 1}`}
             
              style={{
                width: '100%',
                maxWidth: '100%',
                maxHeight: '300px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                borderRadius:'12px',
                backgroundColor: '#fff'
               
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
