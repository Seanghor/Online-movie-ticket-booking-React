import { useEffect, useState } from "react"
// import { IconButton } from "../components/Icon_Button"
import { MovieResponse } from "../types/movie.dto"
import { getAllMovieFilterByStatus, getAllMovieFilterIsTop } from "../services/movie"
import { HomeCard } from "../components/Cards/HomeCard"
import '../index.css'
// import { useLocation } from "react-router-dom";
// import ImageSlider from "../components/CoverSlider"
import CoverSlider from "../components/CoverSlider"
import { Link, Element, scroller } from 'react-scroll';
// import { CursorButtonNext } from "../components/Buttons/CursorButtonNext"
// import { CursorButtonPrevious } from "../components/Buttons/CursorPreviousButton"
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const HomePage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const showing = urlParams.has('showing');
  const soon = urlParams.has('soon');
  const moviesPerPage = 8

  // slide top movie:
  const [topMovie, setTopMovie] = useState<MovieResponse[]>([])
  const totalPagesTop = Math.ceil(topMovie.length / moviesPerPage);
  const [currentPageTop, setCurrentPageTop] = useState<number>(1);
  const [showCursorTopMov, setShowCursorTopMov] = useState(false)

  // now playing:
  const [nowPlaying, setNowPlaying] = useState<MovieResponse[]>([])
  const totalPagesNowPlaying = Math.ceil(nowPlaying.length / moviesPerPage);
  const [currentPageNowPlaying, setCurrentPageNowPlayingp] = useState(1);
  const [showCursorNowPlayingMov, setShowCursorNowPlayingMov] = useState(false)

  // comming soon
  const [comingSoon, setComingSoon] = useState<MovieResponse[]>([])
  const totalPagesSoon = Math.ceil(comingSoon.length / moviesPerPage);
  const [currentPageSoon, setCurrentPageSoon] = useState(1);
  const [showCursorSoonMov, setShowCursorSoonMov] = useState(false)

  const scrollToSection = (showSection: string) => {
    scroller.scrollTo(showSection, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -500 //
    });
  };
  useEffect(() => {
    const fetchTopMovieData = async () => {
      const res = await getAllMovieFilterIsTop("true")
      // console.log("Status:", res.status)
      setTopMovie(await res.json())
    };
    const fetchCommingSoonMovieData = async () => {
      const res = await getAllMovieFilterByStatus("COMING_SOON")
      // console.log("Status:", res.status)
      setComingSoon(await res.json())
    };
    const fetchNowPlayingMovieData = async () => {
      const res = await getAllMovieFilterByStatus("NOW_SHOWING")
      // console.log("Status:", res.status)
      setNowPlaying(await res.json())
    };

    if (soon) {
      scrollToSection("coming_section")
    } else if (showing) {
      scrollToSection('nowPlaying_section')
    }
    fetchTopMovieData();
    fetchCommingSoonMovieData()
    fetchNowPlayingMovieData()
  }, []);







  // dynamic function
  function goToNextPage(currentPage: number, totalPages: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>) {
    if (currentPage < totalPages) {
      return setCurrentPage(currentPage + 1);
    } else {
      return setCurrentPage(1);
    }
  };
  const goToPreviousPage = (currentPage: number, totalPages: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      return
    }
    setCurrentPage(totalPages)
  };


  // this for top movie slide: we put auto slide only for top movie
  function goToNextPageTop() {
    if (currentPageTop < totalPagesTop) {
      return setCurrentPageTop(currentPageTop + 1);
    } else {
      return setCurrentPageTop(1);
    }
  };

  useEffect(() => {
    const intervalTopMovie = setInterval(goToNextPageTop, 4000); // Call goToNextPage every 4 seconds
    return () => {
      clearInterval(intervalTopMovie);
    };
  }, [currentPageTop, totalPagesTop]); // Add currentPage and totalPages as dependencies
  // ---------- Top Movie
  const startIndexTop = (currentPageTop - 1) * moviesPerPage;
  const endIndexTop = startIndexTop + moviesPerPage;
  const currentTopMovies = topMovie.slice(startIndexTop, endIndexTop);

  // ------------- now playing:
  const startIndexNowPlaying = (currentPageNowPlaying - 1) * moviesPerPage;
  const endIndexNowPlaying = startIndexNowPlaying + moviesPerPage;
  const currentNowPlayingMovies = nowPlaying.slice(startIndexNowPlaying, endIndexNowPlaying);

  // ------------- Coming Soon:
  const startIndexSoon = (currentPageSoon - 1) * moviesPerPage;
  const endIndexSoon = startIndexSoon + moviesPerPage;
  const currentSoonMovies = comingSoon.slice(startIndexSoon, endIndexSoon);



  // handle hover mouse on:
  const handleMouseEnter = (setVisible: Function) => {
    setVisible(true);
  };
  const handleMouseLeave = (setInvisible: Function) => {
    setTimeout(() => setInvisible(false), 1500);
  };




  return (
    <div className=' movie bg-gradient-to-r from-red-900 to-purple-900 min-h-screen '>
      <CoverSlider />
      
      <div className="px-[145px] flex-grow w-full py-4 sm:py-16 mx-auto ">
        {/* <div className="group  w-60 h-40 m-3">
        </div> */}
        {/* Top Movie */}
        <div>
          <h4 className="ml-3 uppercase font-poppins my-10 text-4xl font-bold animate-text bg-gradient-to-r from-yellow-200 via-blue-200 to-green-500 text-transparent bg-clip-text animate-gradient">Top Movie</h4>
          <div
            onMouseOver={() => { handleMouseEnter(setShowCursorTopMov) }}
            onMouseLeave={() => {
              handleMouseLeave(setShowCursorTopMov)
            }}
            className="h-64 no-scrollbar flex flex-no-wrap justify-between items-center overflow-scroll  mb-20">
            <div
              onClick={() => goToPreviousPage(currentPageTop, totalPagesTop, setCurrentPageTop)}
              className="group">
              <ArrowBackIosIcon style={{ color: "" }} className={`text-cyan-300  hover:text-cyan-800 ${showCursorTopMov ? "visible" : "invisible"}`} />
            </div>
            <div className=" justify-between grid grid-cols-8 w-full items-start justify-items-start">
              {
                currentTopMovies?.map((item: MovieResponse, index: number) => (
                  <Link
                    key={index} className="" to={`/movie/${item.id}`} onClick={() => { console.log("selected now playing") }}>
                    <HomeCard
                      id={item?.id?.toString() || ""}
                      image={item?.image || ""}
                      title={item?.title || ""}
                      trailer={item?.trailer || ""}
                      movieType={item?.movieType?.toString() || ""}
                      movieStatus={item?.status?.toString() || ""}
                      duration_min={item?.duration_min}
                    />
                  </Link>
                ))
              }
            </div>

            <div
              onClick={() => goToNextPage(currentPageTop, totalPagesTop, setCurrentPageTop)}
              className="group">
              <ArrowForwardIosIcon style={{ color: "" }} className={`text-cyan-300 hover:text-cyan-800 ${showCursorTopMov ? "visible" : "invisible"}`} />
            </div>  
          </div>
        </div>

        {/* Now Playing */}
        <Element name='nowPlaying_section'>
          <h4 className="ml-3 uppercase font-poppins my-10 text-4xl font-bold animate-text bg-gradient-to-r from-blue-300 via-green-500 to-yellow-200  text-transparent bg-clip-text animate-gradient">Now Showing</h4>
          <div
            onMouseOver={() => { handleMouseEnter(setShowCursorNowPlayingMov) }}
            onMouseLeave={() => {
              handleMouseLeave(setShowCursorNowPlayingMov)
            }}
            className="h-64  no-scrollbar flex flex-no-wrap justify-between items-center overflow-scroll  mb-20">
            <div
              onClick={() => goToPreviousPage(currentPageNowPlaying, totalPagesNowPlaying, setCurrentPageNowPlayingp)}
              className="">
              <ArrowBackIosIcon style={{ color: "" }} className={`text-cyan-300 hover:text-cyan-800 ${showCursorNowPlayingMov ? "visible" : "invisible"}`} />
            </div>
            <div className="justify-between grid grid-cols-8 w-full items-start justify-items-start">
              {
                currentNowPlayingMovies?.map((item: MovieResponse, index: number) => (
                  <Link
                    key={index} className="" to={`/movie/${item.id}`} onClick={() => { console.log("selected now playing") }}>
                    <HomeCard
                      id={item?.id?.toString() || ""}
                      image={item?.image || ""}
                      title={item?.title || ""}
                      trailer={item?.trailer || ""}
                      movieType={item?.movieType?.toString() || ""}
                      movieStatus={item?.status?.toString() || ""}
                      duration_min={item?.duration_min}
                    />
                  </Link>
                ))
              }
            </div>
            <div
              onClick={() => goToNextPage(currentPageNowPlaying, totalPagesNowPlaying, setCurrentPageNowPlayingp)}
              className="">
              <ArrowForwardIosIcon style={{ color: "" }} className={`text-cyan-300 hover:text-cyan-800 ${showCursorNowPlayingMov ? "visible" : "invisible"}`} />
            </div>
          </div>
        </Element>

        {/* Comming Movie */}
        <Element name='coming_section'>
          <h4 className="ml-3 uppercase font-poppins my-10 text-4xl font-bold animate-text bg-gradient-to-r from-green-500  via-yellow-200  to-blue-200 text-transparent bg-clip-text animate-gradient">Coming Soon</h4>
          <div
            onMouseOver={() => { handleMouseEnter(setShowCursorSoonMov) }}
            onMouseLeave={() => {
              handleMouseLeave(setShowCursorSoonMov)
            }}
            className="h-64  no-scrollbar flex flex-no-wrap justify-between items-center overflow-scroll  mb-20">
            <div
              onClick={() => goToPreviousPage(currentPageSoon, totalPagesSoon, setCurrentPageSoon)}
              className="">
              <ArrowBackIosIcon style={{ color: "" }} className={`text-cyan-300 hover:text-cyan-800 ${showCursorSoonMov ? "visible" : "invisible"}`} />
            </div>
            <div className="justify-between grid grid-cols-8 w-full items-start justify-items-start">
              {
                currentSoonMovies?.map((item: MovieResponse, index: number) => (
                  <Link
                    key={index} className="" to={`/movie/${item.id}`} onClick={() => { console.log("selected now playing") }}>
                    <HomeCard
                      id={item?.id?.toString() || ""}
                      image={item?.image || ""}
                      title={item?.title || ""}
                      trailer={item?.trailer || ""}
                      movieType={item?.movieType?.toString() || ""}
                      movieStatus={item?.status?.toString() || ""}
                      duration_min={item?.duration_min}
                    />
                  </Link>
                ))
              }
            </div>
            <div
              onClick={() => goToNextPage(currentPageSoon, totalPagesSoon, setCurrentPageSoon)}
              className="">
              <ArrowForwardIosIcon style={{ color: "" }} className={`text-cyan-300 hover:text-cyan-800 ${showCursorSoonMov ? "visible" : "invisible"}`} />
            </div>
          </div>
        </Element>

      </div>

    </div>
  )
}

export default HomePage
