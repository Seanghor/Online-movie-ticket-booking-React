import React, { useEffect, useState } from 'react'
import { ScheduleOfCinema } from './ScheduleOfCinema_model'
import CinemaIcon from '../assets/cinema_icon.svg';
import CinemaImg from '../assets/cinema.jpg';
import { MovieResponse } from '../types/movie.dto';
import { HomeCard } from './Cards/HomeCard';
import { getAllMovieFilterByStatus, getAllMovieFilterIsTop } from '../services/movie';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { getOneCinema } from '../services/campus';
import { CinemaResponse } from '../types/campus.dto';
import { useLocation } from 'react-router-dom';

const CinemaMoreInforDetail = () => {

  const [nowPlaying, setNowPlaying] = useState<MovieResponse[]>([])
  const [comingSoon, setComingSoon] = useState<MovieResponse[]>([])
  const [activeTab, setActiveTab] = React.useState("now_playing");
  const location = useLocation();
  const [cinema, setCinema] = useState<CinemaResponse | null>(null);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');


  useEffect(() => {
    const fetchNowPlayingMovieData = async () => {
      const res = await getAllMovieFilterByStatus("NOW_SHOWING")
      setNowPlaying(await res.json())
    };

    const fetchOneCinema = async () => {
      const res = await getOneCinema(id?.toString() || "")
      setCinema(await res.json())
    };

    const fetchCommingSoonMovieData = async () => {
      const res = await getAllMovieFilterByStatus("COMING_SOON")
      // console.log("Status:", res.status)
      setComingSoon(await res.json())
    };
    fetchNowPlayingMovieData();
    fetchCommingSoonMovieData();
    fetchOneCinema()
  }, [id]);
  console.log(id)

  const data = [
    {
      label: "Now Playing",
      value: "now_playing",
      list: nowPlaying
    },
    {
      label: "Coming Soon",
      value: "coming_soon",
      list: comingSoon
    }
  ]
  const handleShowTime = async () => {
    console.log("Show Time");
    window.location.href = `/cinema/showtime?id=${id}`;
  }
  return (
    <div className='mx-auto bg-gradient-to-r from-red-900 to-purple-900 min-h-screen'>
      {/* Cover Image and Text Overlay */}
      <div className="relative items-start">
        <img src={CinemaImg} alt="" className='w-full h-96 object-cover' />
        <div className="absolute bottom-0 left-0 right-0 px-8 py-4 bg-gray-800 opacity-70">
          <h2 className='text-white font-bold'>{cinema?.name}</h2>
          <p className="mt-2 text-sm text-gray-50">{cinema?.address}</p>
          <p className="mt-2 text-sm text-gray-50">{cinema?.phone}</p>
          <button
            onClick={() => { handleShowTime() }}
            className="mt-6 text-black font-semibold bg-white backdrop-blur-lg shadow-lg border hover:text-white hover:bg-[#130B2B] rounded text-base px-4 py-2 text-center uppercase ">
            showtimes
          </button>
        </div>
      </div>
      {/* Cover Image and Text Overlay End*/}


      <div className="container flex-grow w-full py-4 sm:py-16 mx-auto">
        {/* Display Top Movie & Comming Soon Movie */}
        <Tabs value={activeTab}>
          <div className="">
          <TabsHeader
            className="rounded-none ml-8 border-b border-blue-gray-50 bg-transparent p-0 w-96"
            indicatorProps={{
              className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={`flex text-2xl font-semibold uppercase pb-5 ${activeTab === value ? "text-blue-500" : "text-white "} `}
              >
                <h2>{label}</h2>{/* {label} */}
              </Tab>
            ))}
          </TabsHeader>
          </div>
         
          <TabsBody>
            {data.map(({ value, list }) => (
              <TabPanel key={value} value={value}>
                <div className="no-scrollbar flex flex-no-wrap overflow-x-scroll scrolling-touch scrollbar-none items-start mb-20">
                  {
                    list?.map((item: MovieResponse, index: number) => (
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
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
        {/* End Of Display Movie */}

        {/* Address */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col p-5">
            <div className="m-5">
              <h1 className="text-3xl text-white font-bold uppercase">
                address </h1>
              <p className="mt-2 text-lg text-gray-50">{cinema?.address}</p>
            </div>

            <div className="m-5">
              <h1 className="text-3xl text-white font-bold uppercase">
                Office Hours </h1>
              <p className="mt-2 text-lg text-gray-50">9:00 AM - 21:00 PM</p>
            </div>
          </div>

          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7818.122797793772!2d104.9343772!3d11.5474534!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109512eac99f311%3A0x357b789190b76c34!2sMajor%20Cineplex%20Aeon%20Mall%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1689706866262!5m2!1sen!2skh"
            width="600" height="450" loading="lazy">
          </iframe>
        </div>
        {/* Address End */}
       
      </div>

    </div>
  )
}

export default CinemaMoreInforDetail
