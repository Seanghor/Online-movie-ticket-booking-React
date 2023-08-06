// import { useEffect, useState } from "react";
import { MovieTypeEnum, ScreeningStatusEnum } from "../types/enum.type";
import { MovieResponse } from "../types/movie.dto";
import TimerIcon from '@mui/icons-material/Timer';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClosedCaptionOffIcon from '@mui/icons-material/ClosedCaptionOff';
import { convertMinutesToHHMM, formatDateTo_dd_mm_yy, formatTimeTo12Hour } from "../utils/utils";
// import { scroller } from "react-scroll";
export interface ScreeningProps {
  id: string,
  image: string,
  title: string,
  duration_min: number,
  sub_title: string,
  movieType: string | MovieTypeEnum,
  onClick: Function,
  opening_date: string | Date
  movie: MovieResponse
  showUpScreenId: string
  screeningData: {
    id: number,
    campusId: number,
    movieId: number,
    auditoruimId: number,
    date_show: Date,
    duration_min: number,
    startTime: Date,
    endTime: Date,
    status: ScreeningStatusEnum,
    isAvailable: boolean,
  }[]

}


export const ScheduleOfCinema: React.FunctionComponent<ScreeningProps> = (props: ScreeningProps) => {
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  const { onClick, showUpScreenId, image, title, opening_date, duration_min, sub_title, movieType, screeningData } = props
  // const [movieId, setMovieId] = us


  return (
    <div className="bg-[#130B2B] flex flex-col shadow-lg border my-9 md:flex-col md:max-w-4xl ">
      <div className="flex flex-row ">
        {/* Movie Image */}
        <div className="w-36 h-56 ">
          <img src={image}
            alt="" className='w-full h-full objext-cover mr-10' />
        </div>

        {/* Movie Detail */}
        <div>
          {
            <div className="flex flex-col justify-between pl-10 leading-normal p-4">
              <h5 className=" flex flex-row mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">{title}</h5>
              <div className="mt-6 flex flex-col ">
                <div className="flex flex-row ">
                  <CalendarMonthIcon className="text-white" />
                  <h4 className="font-[poppins] font-normal text-slate-200 text-lg ml-3">{formatDateTo_dd_mm_yy(opening_date.toString())}</h4>
                </div>

                <div className="flex flex-row">
                  <TimerIcon className="text-white" />
                  <h4 className="font-[poppins] font-normal text-slate-200 text-lg ml-3">{convertMinutesToHHMM(duration_min)}</h4>
                </div>

                <div className="flex flex-row">
                  <ClosedCaptionOffIcon className="text-white text-5xl" />
                  <h4 className="font-[poppins] font-normal text-slate-200 text-lg ml-3">{sub_title}</h4>
                </div>

                <div className="flex flex-row">
                  <CategoryIcon className="text-white text-5xl" />
                  <h4 className="font-[poppins] font-normal text-slate-200 text-lg ml-3">{movieType}</h4>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      {/* Button */}
      <div className="flex flex-row md:gap-4 p-5 sm:gap-2">
        {
          screeningData?.map((screen: any, index: number) => (
            <button
              key={index}
              onClick={() => onClick(screen.id, screen.movieId)}
              className={`text-white w-24 rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 
              ${screen.isAvailable
                  ? "bg-transparent hover:bg-white hover:border-transparent  hover:text-black text-white-700 font-semibold py-2 px-4 border border-white-500  rounded"
                  : "rounded-md bg-gradient-to-r from-indigo-900 to-gray-900"} 
                      ${screen.id.toString() == showUpScreenId
                  ? 'bg-white text-zinc-950'
                  : ''}`}
            >
              {formatTimeTo12Hour(screen?.startTime)}
            </button>
          ))
        }
      </div>
    </div>
  );
}