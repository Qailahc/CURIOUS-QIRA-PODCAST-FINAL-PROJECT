import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const CarouselSlider = ({ data, showIndices }) => {
  // Take the shows based on the specified indices
  const showsToDisplay = showIndices.map((index) => data[index]).filter(Boolean);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2 className='slider-heading'>Shows you may be interested in ...</h2>
      <Slider {...settings} className='slider-grid'>
        {showsToDisplay.map((show) => (
          <div key={show.id}>
            <h3>{show.title}</h3>
            <img src={show.image} alt={show.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSlider;