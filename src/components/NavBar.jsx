import React from 'react';
import Slider from 'react-slick'; // Importing Slider component from react-slick library
import 'slick-carousel/slick/slick.css'; // Importing CSS for slick slider
import 'slick-carousel/slick/slick-theme.css'; // Importing theme CSS for slick slider

// CarouselSlider component for rendering a carousel slider
const CarouselSlider = ({ data, showIndices }) => {
  // Take the shows based on the specified indices
  const showsToDisplay = showIndices.map((index) => data[index]).filter(Boolean); // Filtering out null or undefined values

  // Settings configuration for the slider
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Looping through slides infinitely
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    responsive: [ // Responsive settings for different breakpoints
      {
        breakpoint: 768, // Breakpoint for tablet devices
        settings: {
          slidesToShow: 1, // Adjust slides to show for tablet devices
          slidesToScroll: 1, // Adjust slides to scroll for tablet devices
        },
      },
      {
        breakpoint: 480, // Breakpoint for mobile devices
        settings: {
          slidesToShow: 1, // Adjust slides to show for mobile devices
          slidesToScroll: 1, // Adjust slides to scroll for mobile devices
        },
      },
    ],
  };

  return (
    <div>
      {/* Title for the carousel */}
      <h2 className='slider-heading'>Shows you may be interested in ...</h2>
      {/* Slider component with settings */}
      <Slider {...settings} className='slider-grid'>
        {/* Mapping through shows to display each show */}
        {showsToDisplay.map((show) => (
          <div key={show.id}>
            <h3>{show.title}</h3> {/* Show title */}
            <img src={show.image} alt={show.title} /> {/* Show image */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSlider; // Exporting the CarouselSlider component
