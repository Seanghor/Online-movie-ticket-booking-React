import React, { useEffect, useState } from "react";
import { getAllMovie, getAllMovieOnScreening } from "../services/movie";
import { Card } from "../components/Cards/Card";
import { Link } from "react-router-dom";
import { MovieResponse } from "../types/movie.dto";
import { CursorButtonPrevious } from "../components/Buttons/CursorPreviousButton";
import { CursorButtonNext } from "../components/Buttons/CursorButtonNext";

const Movie = () => {
  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  // RGB color
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);


  useEffect(() => {
    // fectData
    const fetchAllMovieData = async () => {
      const res = await getAllMovieOnScreening();
      const allMovies = await res.json();
      setMovies(allMovies);
    };

    // RGB
    const interval = setInterval(() => {
      setRed((prevRed) => (prevRed - 1) % 256);
      setGreen((prevGreen) => (prevGreen + 1) % 256);
      setBlue((prevBlue) => (prevBlue + 2) % 256);
    }, 50);

    // scroll bar
    //document.body.style.overflow = "hidden";
    return () => {
      fetchAllMovieData();
      clearInterval(interval);
      // Restore the scroll bar when the component unmounts
      document.body.style.overflow = "auto";
    }
  }, []);


  const color = `rgb(${red}, ${green}, ${blue})`;
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      return
    }

    setCurrentPage(totalPages)
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      return
    }
    setCurrentPage(1)
  };

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  const showPagination =
    totalPages > 1 && currentMovies.length >= 1; // Show pagination if there are more than 1 page and at least 3 movies on the current page



  return (
    <div className="movie bg-gradient-to-r from-red-900 to-purple-900 min-h-screen">

      <div className="flex-grow w-full py- sm:py-16 mx-auto relative mt-16">
        <h4
          id="runningColorText"
          className="bg-gradient-to-r from-crimson to-springgreen via-orange bg-clip-text bg-gradient-rainbow text-transparent text-5xl w-80vw mx-auto my-20 text-center transition-colors duration-200 uppercase font-extrabold from-neutral-700 mb-2 mt-4 font-poppins"
          style={{ color }}
        >
          Movies
        </h4>

        <div className="flex flex-row ">
          <CursorButtonNext onClick={() => { goToNextPage() }} />
          
          <div className="container w-full py-4 mx-auto relative grid grid-cols-6 gap-5">
            {currentMovies?.map((item: MovieResponse, index: number) => (
              <Link
                key={index}
                to={`/movie/${item.id}`}
                onClick={() => {
                  console.log("selected now playing");
                }}
              >
                <Card image={item?.image || ""} title={item?.title || ""} opening_date={item?.opening_date || ""} />
              </Link>
            ))}
          </div>
          <CursorButtonPrevious onClick={() => { goToPreviousPage() }} />
        </div>
      </div>


      {/* {showPagination && (
        <div className="pagination-container absolute bottom-4 right-4">
          <button
            className={`px-2 py-1 text-white rounded-md mr-2 ${currentPage === 1
              ? "bg-gray-500 cursor-not-allowed"
              : " bg-red-500 hover:bg-red-600"
              }`}
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-white">{`Page `}</span>
          <span className="text-orange-500">{`${currentPage} `}</span>
          <span className="text-white">of</span>
          <span className="text-white">{` ${totalPages}`}</span>
          <button
            className={`px-2 py-1 text-white rounded-md ml-2 ${currentPage === totalPages
              ? "bg-gray-500  cursor-not-allowed"
              : "hover: bg-red-500 hover:bg-red-600"
              }`}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )} */}
    </div >
  );
};

export default Movie;
