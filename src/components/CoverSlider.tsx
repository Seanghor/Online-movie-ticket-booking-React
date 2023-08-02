import { useEffect, useState } from "react";
import CV1 from '../assets/cv1.png';
import CV2 from '../assets/cv2.png';
import CV3 from '../assets/cv3.png';
import CV4 from '../assets/cv4.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const CoverSlider = () => {
  const images = [
    {
      image:CV1,
      title: "Jacker",
      description: "Jacker potato crisps makes an incredible snack which you can enjoy at any time, Vegetable flavored snacks are a unique combination of great taste and good fun rolled into one great snack."
    }, 
    {
      image: CV2,
      title: "CRUISER",
      description: "Established in 2000, Vodka Cruiser is a favourite ready-to-drink vodka brand. With fruit-inspired colours, the Vodka Cruiser range comes with strong flavour credentials and the 'Premium Triple Distilled Vodka' signature."
    }, 
    {
      image: CV3,
      title: "AIA Easy & Fast",
      description: "We're striving to create a better, more sustainable future by empowering customers to understand and manage every aspect of their health, wellness and protection needs"
    }, 
    {
      image: CV4,
      title: "Kirirom Institute of Technology",
      description: "Kirirom Institute of Technology is a private university in Cambodia that focuses on IT and was founded in 2014. Currently, it consists of two departments, Software engineering and International Leaders Hospitality Management with around 230 students from Cambodia and Japan."
    }, 
  ];
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

  const [showCursorCoverSlider, setShowCursorCoverSlider] = useState(false)
  // handle hover mouse on:
  const handleMouseEnter = (setVisible: Function) => {
    setVisible(true);
  };
  const handleMouseLeave = (setInvisible: Function) => {
    setTimeout(() => setInvisible(false), 500);
  };

  return (
    <div 
      onMouseOver={() => { handleMouseEnter(setShowCursorCoverSlider) }}
      onMouseLeave={() => {
        handleMouseLeave(setShowCursorCoverSlider)
      }}
      className="relative w-full h-[60vh] overflow-hidden">
         {/* Previous Btn */}
         <button
          className= {`absolute top-1/2 ml-5 left-0 transform -translate-y-1/2 z-[1] text-white flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300 focus:outline-none ${showCursorCoverSlider ? "visible" : "invisible"}`}
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
        {/* Previous Btn End */}

      {/* Carousel items */}
      <div className="relative w-full h-full">
        {images.map((cover, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transform transition-transform duration-500 ${index === activeIndex ? "translate-x-0" : "translate-x-full"}`}
          >
            <img src={cover.image} alt={`image ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-center text-white bg-black bg-opacity-50">
              <h5 className="text-xl">{cover.title}</h5>
              <p>{cover.description}</p>
            </div>
          </div>
        ))}
        
      </div>
      {/* Caroused items End */}

      {/* Next Btn */}
      <button
        className={`mr-5 absolute top-1/2 right-0 transform -translate-y-1/2 z-[1] text-white flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300 focus:outline-none ${showCursorCoverSlider ? "visible" : "invisible"}`}
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
      {/* Next Btn End */}
    </div>
  );
};

export default CoverSlider;
