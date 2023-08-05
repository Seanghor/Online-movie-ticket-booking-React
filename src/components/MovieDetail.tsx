
import React from 'react';
import { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMovieById } from "../services/movie";
import { MovieResponse } from "../types/movie.dto";
import GradeIcon from '@mui/icons-material/Grade';
import TimerIcon from '@mui/icons-material/Timer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CategoryIcon from '@mui/icons-material/Category';
import { ScreeningProps, ShowTimeSchedule } from "./Schedule_model";
import { getAllScreeningByMovieIdAndDate, getAllScreeningByMovieIdAndGroupByDate, getOneScreeningById } from "../services/screening";
import { DifferentCinemaScreeningResponse, DifferentDateScreeningResponse } from "../types/screening.dto";
import { Seat } from "./Seat";
import { getSeatOfScreening } from "../services/seat";
import { SeatList, SingleRowOfSeat, SingleSeatRespone } from "../types/seat.dto";
import { SelectMovieModel } from "./Select_movie_model";
import { convertMinutesToHHMM, formatDateToShortCurt, formatDateTo_dd_mm_yy, formatName, formatTimeTo12Hour, getRowLetter } from "../utils/utils";
import SeatNote from "./SeatNote";
import { Element, scroller } from 'react-scroll';
import image_seat from '../assets/images/seat/seat_available.svg'
import image_sealectedSeat from '../assets/images/seat/seat_selected.svg'
import bookIcon from '../assets/booked.svg'
import image_notAvialable from '../assets/images/seat/not_avialable.svg'
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getOneCinema } from '../services/campus';
import { getAccessToken, getRefreshToken, getUserInfor } from '../services/auth';

// for scroll section(whenever value of showSecton change --> this function is called)
const scrollToSection = (showSection: string) => {
  console.log("-------- > On Section:", showSection);

  scroller.scrollTo(showSection, {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart',
    offset: -100 //
  });
};



const currentDate = new Date().toISOString().substring(0, 10);
const MovieDetail = () => {
  const navigate = useNavigate();
  // check token:
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  const userInfo = getUserInfor()
  const [isAuth, setIsAuth] = useState(false)

  // movie
  const { id } = useParams();
  const [movieId, setMovieId] = useState(id)
  const [movie, setMovie] = useState<MovieResponse | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const showParam = searchParams.get("show");
  // console.log("showParam:", showParam, typeof (searchParams));

  const booleanValue = showParam === "true" ? true : false;
  // screen
  const [screenId, setScreenId] = useState<null | string>(null)
  const [oneScreening, setOncScreening] = useState<any | null>(null)
  const [screening, setScreening] = useState<DifferentCinemaScreeningResponse[]>([])
  const [showSchedule, setShowSchedule] = useState<boolean>(booleanValue)
  const [screeningDataGroupByDate, setScreeningDataGroupByDate] = useState<DifferentDateScreeningResponse[]>([])
  const [datesArray, setDatesArray] = useState<string[] | []>([])
  const [showDate, setShowDate] = useState(currentDate)
  const [isAvailable, setIsAvailable] = useState(false)
  const [cinemaName, setCinemaName] = useState<string>('')
  const [cinemaId, setCinemaId] = useState('')


  // seat:
  const [seatData, setSeatData] = useState<SeatList | [][]>([])
  const [showSeat, setShowSeat] = useState(false)
  const [selectSeat, setSelectSeat] = useState<any | []>([])
  const [reserveDataToStorage, setReserveDataToStorage] = useState<any | []>([])
  const [seatIdOfScreen, setSeatIdOfScreen] = useState<any>([])
  const [reserveData, setReserveData] = useState<any | []>([])
  const [listSeatId, setListSeatId] = useState<number[] | []>([])

  // book or reserve:
  // const [cinema, setCinema] = useState("")

  // section:
  // const [showSection, setShowSection] = useState('')
  const [showSection, setShowSection] = useState(showSchedule === true ? "schedule_section" : "")

  // search:
  const [search, setSearch] = useState('')

  // refresh:
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)


  const [screeningProps, setScreeningProps] = useState<ScreeningProps>({
    name: "",
    Screening: [], // Update this array with your actual data
    onClick: () => {
      console.log("action");
    },
    showUpScreenId: "", // Assuming showUpScreenId is a string, change to the appropriate type if needed
  });
  useEffect(() => {
    scrollToSection(showSection)
  }, [showSection])
  // ------------------------ useEffect
  useEffect(() => {
    // fect singleMovie data:
    const fechMovieData = async () => {
      const res = await getMovieById(movieId || "")
      let movieData = await res.json()
      setMovie(movieData);
    }
    fechMovieData()

    // fect all screening of the movie group by date(to display all screen of the movie)
    const fectAllScreeningGroupByDate = async () => {
      const res = await getAllScreeningByMovieIdAndGroupByDate(movieId || "")
      let fectDataResponse = await res.json()
      // console.log("res:", fectDataResponse);
      if (fectDataResponse.statusCode == 400) {
        setScreeningDataGroupByDate([])
        return
      }
      setScreeningDataGroupByDate(fectDataResponse)

      // get all dateShow of movie:
      const array: string[] | [] | "" = fectDataResponse
        .filter((item: DifferentDateScreeningResponse) => item.date > currentDate)
        .map((item: DifferentDateScreeningResponse) => item.date);

      // Use Set to store unique values of dates(set not contain duplicate)
      const uniqueDatesSet = new Set(array);
      // console.log("uniqueDatesSet:", uniqueDatesSet);

      // Convert Set back to an array
      const uniqueDatesArray: string[] | Date[] = Array.from(uniqueDatesSet);
      setDatesArray(uniqueDatesArray.slice(0, 3))
    }
    fectAllScreeningGroupByDate()
  }, [id, movieId, reducerValue])

  // --------------------------------------- when date change:
  useEffect(() => {
    // fect all screening of the movie and filter by date:
    const fechScreeningDataByDate = async () => {
      console.log("selecting date:", showDate);
      const res = await getAllScreeningByMovieIdAndDate(movieId || '', showDate)
      let dataResponse = await res.json()
      // console.log("Screening by date:", dataResponse);

      if (dataResponse.statusCode === 400 || dataResponse.statusCode === 500) {
        setScreening([]);
        return
      }
      setScreening(dataResponse)
    }
    fechScreeningDataByDate()
    // scrollToSection(showSection)
  }, [showDate])

  // --------------------------------------- when screen change:
  useEffect(() => {
    // -- fect seat of the screening:
    const fechSeatData = async () => {
      const res = await getSeatOfScreening(screenId || "")
      let seatData = await res.json()

      // get all reserve data in localStorage:
      const reservedataLocalStorage: any = JSON.parse(localStorage.getItem('reserve') || "")
      // console.log("All Data from LocalStorage:", reservedataLocalStorage[0]); // see first screening

      setReserveData(reservedataLocalStorage)
      if (screenId !== null) {
        // find screeningId we are in now:
        let reserve = reservedataLocalStorage.find((reserve: any) => reserve?.screeningId === screenId)
        if (reserve) {
          // make it to array contain id's value only: example: [1, 2, 3, 4]
          let arrayReserveSeat = (reserve?.seat || []).map((i: any) => Number(i.id)).filter((id: number) => !isNaN(id));

          // set the data from localstorage to as selectedSeat:
          setSelectSeat(reserve?.seat)
          const defaultSeat = seatData.map((rowItem: any) => {
            return rowItem.map((col: SingleRowOfSeat) => {
              return col.map((iitem: SingleSeatRespone) => {
                if (arrayReserveSeat.includes(iitem.id)) {
                  iitem.status = "SELECTED"
                }
                return iitem
              })
            })

          })
          return setSeatIdOfScreen(defaultSeat)
        }
      }
      return setSeatIdOfScreen(seatData)
    }
    fechSeatData()
    // fect screening by id:
    const fechOneScreenData = async () => {
      const res = await getOneScreeningById(screenId || "")
      let screeningNowData = await res.json()

      if (screeningNowData) {
        // fect cinema:
        setCinemaId(screeningNowData.campusId)
        const cinema = await getOneCinema(screeningNowData.campusId)
        const cinemaJson = await cinema.json()
        setCinemaName(cinemaJson.name)
        setOncScreening(screeningNowData)
        // console.log("On Cinema:", cinemaJson.name);
      }

      // - test : screen props---------------------------------------------------------------:
      setScreeningProps({
        name: movie?.title || "",
        Screening: [], // Update this array with your actual data
        onClick: () => {
          console.log("action");
        },
        showUpScreenId: "", // Assuming showUpScreenId is a string, change to the appropriate type if needed
      });

      // ---log:

      // console.log("ScreeningId:", screenId);
      // console.log("Choose screen time:", formatTimeTo12Hour(screeningNowData.startTime));


    }
    fechOneScreenData()
  }, [screenId, reducerValue])


  const handleClickSeat = (id: number) => {
    const updatedSeatIdOfScreen = seatIdOfScreen.map((rowItem: any) => {
      return rowItem.map((col: SingleRowOfSeat) => {
        return col.map((iitem: SingleSeatRespone) => {
          if (iitem?.id === id) {
            if (iitem.status === "SELECTED") {
              iitem.status = "AVAILABLE";
              setSelectSeat((prevSelectSeat: any) => prevSelectSeat.filter((seat: any) => seat.id !== id));

            } else if (iitem.status === "AVAILABLE") {
              iitem.status = "SELECTED";
              setSelectSeat((prevSelectSeat: any) => [...prevSelectSeat, { id: iitem.id, customId: iitem.customId, price: movie?.price }]);
            }
          }
          return iitem;
        });
      });
    });

    // After updating the seat status, call the function to update reserve data in localStorage
    handleAddReserveDataToLocalStorage(updatedSeatIdOfScreen.flat(2));
    const event = new Event('reservationUpdated');
    window.dispatchEvent(event);
  };

  // handle add reserve data to localStorage
  const handleAddReserveDataToLocalStorage = (updatedSeatIdOfScreen: SingleSeatRespone[]) => {
    const updatedBookingData = reserveData?.map((reserve: any, index: number) => {
      if (reserve.screeningId === screenId) {
        if (reserve.seat.length === 0) {
          return
        }
        // Update the existing reservation's selectedSeat property
        return {
          screeningId: screenId,
          cinema: cinemaName,
          movie: movie?.title,
          image: movie?.image,
          price: movie?.price,
          showDate: oneScreening?.date_show,
          showTime: oneScreening?.startTime,
          num: selectSeat.length,
          payStatus: true,
          seat: updatedSeatIdOfScreen
          // seat: updatedSeatIdOfScreen.filter((seat: SingleSeatRespone) => seat.status === "SELECTED")
        };
      } else {
        return reserve;
      }
    });

    // Check if there was no matching reservation, then add a new reservation
    const isExistingReservation = updatedBookingData.some((reserve: any) => reserve.screeningId === screenId);
    if (!isExistingReservation) {
      const newBookingDto: any = {
        screeningId: screenId,
        cinema: cinemaName,
        movie: movie?.title,
        image: movie?.image,
        price: movie?.price,
        showDate: oneScreening?.date_show,
        showTime: oneScreening?.startTime,
        num: selectSeat.length,
        payStatus: true,
        seat: updatedSeatIdOfScreen.filter((seat: SingleSeatRespone) => seat.status === "SELECTED")
      };
      updatedBookingData.push(newBookingDto);
    }
    // Filter out objects with empty 'seat' arrays
    const filteredBookingData = updatedBookingData.filter((booking: any) => booking.seat.length > 0);
    // Save the updatedBookingData to localStorage
    console.log("ReserveData LocalStorage:", reserveData);
    console.log("updatedBookingData:", updatedBookingData[0]);
    // setReserveDataToStorage(filteredBookingData)
    localStorage.setItem("reserve", JSON.stringify(filteredBookingData));
  };


  // -- *** handle submit book:
  const handleSubmitBooking = async () => {
    // await handleAddReserveDataToLocalStorage()
    navigate('/bill_detail')
    // Dispatch a custom event to notify the Navbar component
    const event = new Event('reservationUpdated');
    window.dispatchEvent(event);
  }


  // -- *** handle reserve:
  const handleReserve = () => {
    // handleAddReserveDataToLocalStorage()
    // Dispatch a custom event to notify the Navbar component
    const filteredData = reserveData?.filter((item: { screeningId: number; }) => item.screeningId !== Number(screenId));
    console.log(filteredData);
    setReserveData(filteredData)
    setSelectSeat([])
    localStorage.setItem("reserve", JSON.stringify(filteredData))
    // setReserveData(filteredData)
    const event = new Event('reservationUpdated');
    window.dispatchEvent(event);
    forceUpdate()
  };


  const handleShowTime = () => {
    setShowSection('schedule_section')
    setShowSchedule(true)
    setShowDate(currentDate)
    scrollToSection(showSection)
    // setShowDate(datesArray[0])
  }


  // functionality:
  const handleShowUpSeat = async (id: string) => {
    if (!accessToken || !refreshToken || !userInfo) {
      setTimeout(
        () => navigate('/signup'),
        1500
      );
      return
    }

    setScreenId(id)
    setShowSection('seat_section')
    scrollToSection(showSection)
    setShowSeat(true)
    setSelectSeat([])   // when click another schedule then previous selected will remove
  }



  // console.log("selecting date:", showDate);
  // console.log("datesArray:", datesArray);
  // console.log("screening:", screening);
  // console.log(currentDate);
  // console.log("Cinema:", cinemaName);

  // console.log("Screening:", screening.length);
  // console.log("Reserve from storage:", bookingData);
  // console.log("Select Seat:", selectSeat);
  // console.log("ReserveData LocalStorage:", reserveData);

  // console.log("ReserveSeat:", reserveSeat);
  // console.log("Seat of Screen:", seatIdOfScreen);




  console.log("seatIdOfScreen:", seatIdOfScreen);




  return (
    <>
      <div className="movie bg-gradient-to-r from-red-900 to-purple-900">
        <div className="container mt-16 flex-col w-full py-4 sm:py-16 mx-auto text-center">
          {/* Movie Detaile */}
          <div className="flex flex-col items-center md:flex-row md:max-w-xl">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={movie?.image || ""} alt="" />
            <div className="flex flex-col justify-between pl-10 leading-normal w-full">
              <div className='w-80 '>
                <h5 className="w-full flex flex-row mb-2  text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">{movie?.title ? formatName(movie?.title.toLocaleUpperCase(), 20) : formatName(movie?.title || "", 20)}
                </h5>
              </div>
              <div className="flex flex-row">
                <CalendarMonthIcon className="text-white text-5xl" />
                <h4 className="font-[poppins] font-normal text-slate-200 text-lg ml-3">{formatDateTo_dd_mm_yy(movie?.opening_date.toString() || "")}</h4>
              </div>
              <div className="flex flex-row">
                <TimerIcon className="text-white" />
                <h4 className="font-[poppins] font-normal text-slate-200 text-lg ml-3">{convertMinutesToHHMM(movie?.duration_min || 0)}</h4>
              </div>

              <div className="flex flex-row">
                <GradeIcon className="text-white text-5xl" />
                <h4 className="font-[poppins] font-normal text-slate-200 text-lg ml-3">{movie?.rating}</h4>
              </div>
              <div className="flex flex-row">
                <CategoryIcon className="text-white text-5xl" />
                <h4 className="font-[poppins] font-normal text-slate-200 text-lg ml-3">{movie?.movieType}</h4>
              </div>
              <div className="text-left">
                <p className="my-3 font-normal text-slate-200 dark:text-gray-200 font-poppins">{movie?.description}</p>
                {
                  // || (screening.length !== 0)
                  (showSchedule) ? null : (
                    <button
                      type="button"
                      className="w-50 text-white bg-[#130B2B] backdrop-blur-lg shadow-lg border hover:text-black hover:bg-white  font-medium rounded-lg text-base px-4 py-2 text-center mr-3 md:mr-0"
                      onClick={() => { handleShowTime() }}
                    >
                      SHOW TIME
                    </button>)
                }
              </div>
            </div>
          </div>

          <div >
            {/* Trailer Start */}
            <Element name='trailer_section' className="container mx-auto mt-28">
              <div className="relative w-100 h-48 overflow-hidden " style={{ paddingBottom: '56.25%' }}>
                <iframe className="absolute top-0 left-0 w-full h-full"
                  src={`${movie?.trailer}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
              </div>
            </Element>
            {/* Trailer End */}
            {
              showSchedule ? (
                <Element name='schedule_section'>
                  <div>
                    <div className="flex flex-row items-center py-4 gap-4 mt-10">
                      {/* ----------------- select date */}
                      {/* for today button */}
                      <button
                        onClick={() => {
                          setShowDate(currentDate)
                          setShowSeat(false)  // this when we select change date --> showUpSeat dissapear
                          setScreenId('')
                          // console.log("Date selected on:", date);
                        }}
                        className={`bg-[#130B2B] hover:bg-white font-light text-sm hover:text-black py-2 px-8 border border-white-500 hover:border-transparent rounded ${showDate === currentDate ? 'bg-yellow-500 text-black' : 'text-white'} `}
                      > {"Today"}
                      </button>
                      <ArrowBackIosIcon className='mx-2 text-white ' />
                      {/* for the reamin days button */}
                      {
                        datesArray?.map((date: any, index: number) => (
                          <button
                            key={index}

                            onClick={() => {
                              setShowDate(date)
                              setShowSeat(false)  // this when we select change date --> showUpSeat dissapear
                              setScreenId('')
                              // console.log("Date selected on:", date);
                            }}
                            className={`bg-[#130B2B] hover:bg-white font-light text-sm hover:text-black py-2 px-8 border border-white-500 hover:border-transparent rounded ${showDate === date ? 'bg-yellow-500 text-black' : 'text-white'} `}
                          > {currentDate === date
                            ? 'Today'
                            : formatDateToShortCurt(date)}
                          </button>
                        ))
                      }

                    </div>

                    {/* Seach Bar */}
                    <div className="md:max-w-4xl">
                      <SearchBar search={search} onChange={setSearch} placeHolder='search' />
                      {/* Add other components or logic related to displaying movies */}
                    </div>
                    <div className="">
                      {screening?.filter(
                        ((item: any) => {
                          return search?.toLocaleLowerCase() === ""
                            ? item
                            : item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                        })
                      )
                        .map((item: any, index: number) => (
                          item.Screening.length === 0 ? (null) : (
                            < ShowTimeSchedule
                              key={index}
                              name={item.name}
                              Screening={item.Screening}
                              // --- we can write like this: because we have already specific whichb id already in <ShowTimeSchedule/> component:
                              onClick={handleShowUpSeat}
                              showUpScreenId={screenId || ""}
                            />
                          )
                        ))
                      }
                    </div>

                  </div>
                </Element>
              ) : (null)
            }
            {/* show Seat */}
            {
              showSeat ? (
                <Element name="seat_section" className='md:flex-row h-screen'>
                  <div className="flex flex-row ">
                    <div className="flex flex-row">
                      {/*  Select Seat */}
                      <div style={{ perspective: '600px' }} className=" h-screen bg-slate-800 flex flex-col justify-center items-center rounded-xl py-5">
                        {/* Screen */}
                        <div className="screen rounded-t-[0%] rounded-b-[0%]" style={{ transform: 'rotateX(-40deg)' }}></div>
                        {/* Sreen End */}
                        {/* <div className="grid grid-cols-3 content-start mx-4 my-10"> */}
                        <div className="flex flex-col my-10 overflow-y-auto h-4/5">
                          {
                            seatIdOfScreen?.map((itemRow: any, indexRow: number) => (
                              <div key={indexRow} className='flex flex-row justify-evenl place-items-center px-10'>
                                <div className='justify-center items-center text-2xl font-extrabold text-fuchsia-700 mb-5 w-10'>
                                  {getRowLetter(indexRow)}
                                </div>
                                {/* <div key={indexRow} className='flex flex-row justify-star items-start py-7 '> */}

                                {itemRow.map((row: any, indexBlock: number) => (
                                  <div key={indexBlock} className='flex flex-row px-10 justify-items-start items-start py-7 w-2/3'>
                                    {
                                      row?.map((seat: any, index2: number) => (
                                        <div key={index2} className="mx-1 w-9 ">
                                          <Seat
                                            image={!seat ? image_notAvialable : seat.status === "AVAILABLE" ? image_seat : seat.status === "SELECTED" ? image_sealectedSeat : bookIcon}
                                            title={seat ? seat?.customId : ""}
                                            isDisbled={!seat ? true : seat.status === "OWNED" ? true : false}
                                            onClick={() => handleClickSeat(seat.id)}
                                          />
                                        </div>
                                      ))
                                    }

                                  </div>
                                )
                                )}
                                {/* </div> */}
                                <div className='justify-end items-center text-2xl font-extrabold text-fuchsia-700 mb-5 w-10'>
                                  {getRowLetter(indexRow)}
                                </div>
                              </div>
                            )
                            )
                          }

                        </div>
                        <div className=''>
                          <SeatNote />
                        </div>
                      </div>


                    </div>
                    {/* Ticket Summary */}
                    <div className="ml-10 basis-1/3">
                      <SelectMovieModel
                        cinema={cinemaName}
                        title={movie?.title || "No Name"}
                        image={movie?.image || ""}
                        movieType={movie?.movieType || ""}
                        movieDate={movie?.createdAt || ""}
                        duration_min={movie?.duration_min || 60}
                        auditoruim={oneScreening?.auditorium?.name || ""}
                        timeShow={oneScreening?.startTime || ""}
                        showDate={oneScreening?.date_show || ""}
                        selected={selectSeat}
                        onClickReserve={() => { handleReserve() }}
                        onClickSubmit={() => { handleSubmitBooking() }}
                        onClickCancelSeat={
                          handleClickSeat
                        }
                      />
                    </div>
                    {/* Ticket Summary End */}
                  </div>
                </Element>
              ) : (null)

            }

          </div>

        </div>
      </div >
    </>
  )
}

export default MovieDetail

