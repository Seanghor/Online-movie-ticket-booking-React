import { useEffect, useState } from "react";
import { getAllMovieOnScreening } from "../services/movie";
import { Card } from "../components/Cards/Card";
import { MovieResponse } from "../types/movie.dto";
import { CursorButtonPrevious } from "../components/Buttons/CursorPreviousButton";
import { CursorButtonNext } from "../components/Buttons/CursorButtonNext";
import { Element, scroller } from 'react-scroll';
import { useNavigate } from "react-router-dom";
import SkeletonMoviePage from "../components/Skeleton/SkeletonMoviePage";



const Movie = () => {
  const scrollToSection = (showSection: string) => {
    scroller.scrollTo(showSection, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -500 //
    });
  };
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  // RGB color
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(100);

  // skeleton:
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    scrollToSection("main")
    // fectData
    const fetchAllMovieData = async () => {
      const res = await getAllMovieOnScreening();
      const allMovies = await res.json();
      console.log("=======================getAllMovieOnScreening:", allMovies);

      setMovies(allMovies);
    };
    fetchAllMovieData(),
      // skeleton
      setTimeout(
        () => { setIsLoading(false) },
        500
      );


    // RGB
    const interval = setInterval(() => {
      setRed((prevRed) => (prevRed - 1) % 256);
      setGreen((prevGreen) => (prevGreen + 1) % 256);
      setBlue((prevBlue) => (prevBlue + 2) % 256);
    }, 50);

    // scroll bar
    //document.body.style.overflow = "hidden";
    return () => {
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

  // const showPagination =
  //   totalPages > 1 && currentMovies.length >= 1; // Show pagination if there are more than 1 page and at least 3 movies on the current page



  return (
    <Element name='main' className="flex flex-col movie bg-gradient-to-r from-red-600 to-purple-900 min-h-screen sm:py-16">
      <div className=" justify-center w-full mx-auto relative">
        <h4
          id="runningColorText"
          className="font-black font-Dangrek bg-gradient-to-r from-crimson to-springgreen via-orange bg-clip-text bg-gradient-rainbow text-transparent text-5xl w-80vw mx-auto my-4 text-center transition-colors duration-200 uppercase  from-neutral-700 mt-4 "
          style={{ color }}>
          Movies
        </h4>
      </div>
      <div className="flex flex-row justify-center items-center ">
        <CursorButtonNext onClick={() => { goToNextPage() }} />
        <div className="container grid grid-cols-6 gap-5 flex-row justify- items- w-full">
          {currentMovies?.map((item: MovieResponse, index: number) => (
            <Card key={index} isLoading={isLoading} onClick={() => { navigate(`/movie/${item.id}?show=false`) }} image={item?.image || ""} title={item?.title || ""} opening_date={item?.opening_date || ""} />)
          )}
        </div>
        <CursorButtonPrevious onClick={() => { goToPreviousPage() }} />
      </div>
    </Element >
  );
};

export default Movie;
