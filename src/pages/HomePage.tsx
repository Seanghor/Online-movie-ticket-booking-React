import { useEffect, useState } from "react"
import { IconButton } from "../components/Icon_Button"
import { MovieResponse } from "../types/movie.dto"
import { getAllMovieFilterByStatus, getAllMovieFilterIsTop } from "../services/movie"
import { HomeCard } from "../components/HomeCard"
import '../index.css'
import { useLocation } from "react-router-dom";
import ImageSlider from "../components/CoverSlider"
import CoverSlider from "../components/CoverSlider"
import { Link, Element, scroller } from 'react-scroll';

const HomePage = () => {
  const scrollToSection = (showSection: string) => {
    scroller.scrollTo(showSection, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -500 //
    });
  };
  const [comingSoon, setComingSoon] = useState<MovieResponse[]>([])
  const [nowPlaying, setNowPlaying] = useState<MovieResponse[]>([])
  const [topMovie, setTopMovie] = useState<MovieResponse[]>([])

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const showing = urlParams.has('showing');
  const soon = urlParams.has('soon');
  // console.log("showing:", showing);
  // console.log("soon:", soon);

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


  return (
    <div className='movie bg-gradient-to-r from-red-900 to-purple-900 min-h-screen '>
      <CoverSlider />
      <div className="container flex-grow w-full py-4 sm:py-16 mx-auto ">
        {/* Top Movie */}
        <h4 className="ml-3 uppercase my-10 text-4xl font-bold bg-gradient-to-r from-yellow-200 via-blue-200 to-green-500 translate-x-0 text-transparent bg-clip-text animate-gradient">Top Movie</h4>
        <div className="w-full overflow-hidden relative transform transition-transform duration-500 translate-x-0 h-64 no-scrollbar flex flex-no-wrap overflow-x-scroll scrolling-touch scrollbar-none items-start mb-20">
          {
            topMovie?.map((item: MovieResponse, index: number) => (
              <HomeCard
                key={index}
                id={item?.id?.toString() || ""}
                image={item?.image || ""}
                title={item?.title || ""}
                trailer={item?.trailer || ""}
                movieType={item?.movieType?.toString() || ""}
                movieStatus={item?.status?.toString() || ""}
                duration_min={item?.duration_min}
              />

            ))
          }
        </div>

        {/* Now Playing */}
        <Element name='nowPlaying_section'>
          <h4 className="ml-3 uppercase my-10 text-4xl font-bold bg-gradient-to-r from-blue-200 via-green-500 to-yellow-200  text-transparent bg-clip-text animate-gradient">Now Playing</h4>
          <div className="h-64 no-scrollbar flex flex-no-wrap overflow-scroll items-start mb-20">
            {
              nowPlaying?.map((item: MovieResponse, index: number) => (
                <Link key={index} className="" to={`/movie/${item.id}`} onClick={() => { console.log("selected now playing") }}>
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
        </Element>

        {/* Comming Movie */}
        <Element name='coming_section'>
          <h4 className="ml-3 uppercase my-10 text-4xl font-bold bg-gradient-to-r from-green-500  via-yellow-200  to-blue-200 text-transparent bg-clip-text animate-gradient">Coming Soon</h4>
          <div className="h-64 no-scrollbar flex flex-no-wrap overflow-scroll items-start mb-8">
            {
              comingSoon?.map((item: MovieResponse, index: number) => (
                <Link key={index} className="" to={`/movie/${item.id}`} onClick={() => { console.log("selected tcoming soon") }}>
                  <HomeCard
                    id={item?.id?.toString() || ""}
                    image={item?.image || ""}
                    title={item?.title || ""}
                    trailer={item?.trailer || ""}
                    movieType={item?.movieType?.toString() || ""}
                    movieStatus={item?.status?.toString() || ""}
                    duration_min={item?.duration_min} />
                </Link>
              ))
            }
          </div>
        </Element>

      </div>

    </div>
  )
}

export default HomePage
