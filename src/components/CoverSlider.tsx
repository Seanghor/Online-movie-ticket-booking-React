import { useEffect, useState } from "react";
import CV1 from '../assets/cv1.png';
import CV2 from '../assets/cv2.png';
import CV3 from '../assets/cv3.png';
import CV4 from '../assets/cv4.png';

const CoverSlider = () => {
  const images = [CV1, CV2, CV3, CV4];
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {/* Carousel items */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transform transition-transform duration-500 ${index === activeIndex ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <img src={image} alt={`image ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-center text-white bg-black bg-opacity-50">
              <h5 className="text-xl">Slide {index + 1} label</h5>
              <p>Some representative placeholder content for the slide.</p>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel controls - prev and next */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-[1] flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300 focus:outline-none"
        onClick={goToPrevious}
      >
        <span className="sr-only">Previous</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-[1] flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300 focus:outline-none"
        onClick={goToNext}
      >
        <span className="sr-only">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CoverSlider;
