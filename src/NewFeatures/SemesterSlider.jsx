import React from "react";
import Slider from "react-slick"; // Import Slider
import Results from "./Results";
import "./SemesterSlider.css";
import { FaCircleInfo } from "react-icons/fa6";

const SemesterSlider = ({
  results,
  toggleSemesterDetails,
  expandedSemester,
}) => {
  const settings = {
    dots: false, // Shows navigation dots
    infinite: true, // Infinite loop of slides
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    responsive: [
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1, // Single slide on mobile
        },
      },
      {
        breakpoint: 1024, // Tablet view
        settings: {
          slidesToShow: 2, // Two slides on tablet
        },
      },
      {
        breakpoint: 1280, // Desktop view
        settings: {
          slidesToShow: 3, // Three slides on desktop
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <div
        className="flex tooltip tooltip-bottom tooltip-accent"
        data-tip="Swipe left-right <> Use keyboard arrow keys <> Click to view details"
      >
        <p className="flex items-center gap-2 text-sm text-center text-sky-500 mt-4 cursor-pointer">
          Hover here for instructions
          <span>
            <FaCircleInfo />
          </span>
        </p>
      </div>
      <Slider {...settings}>
        {Array.isArray(results) && results.length > 0 ? (
          results.map((semester, index) => (
            <div key={index} className="my-4">
              <Results
                key={index}
                semester={semester}
                toggleSemesterDetails={toggleSemesterDetails}
                expandedSemester={expandedSemester}
                index={index}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No results available.</div>
        )}
      </Slider>
    </div>
  );
};

export default SemesterSlider;
