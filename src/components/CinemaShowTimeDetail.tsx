import { useEffect, useReducer, useState } from 'react'
import { ScheduleOfCinema } from './ScheduleOfCinema_model'
import { useNavigate } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import { CinemaResponse } from '../types/campus.dto';
import { getAllScreeningOfCampusId, getOneCinema } from '../services/campus';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { MovieResponse, ScreeningDataPerDay } from '../types/movie.dto';
import { getAllMovieByCampusIdFilterDate, getMovieById } from '../services/movie';
import movieDefault from '../assets/default_movie_image.png'
import { formatDateToShortCurt, getRowLetter } from '../utils/utils';
import { SingleRowOfSeat, SingleSeatRespone } from '../types/seat.dto';
import { getSeatOfScreening } from '../services/seat';
import { getOneScreeningById } from '../services/screening';
import { EachScreeningResponse } from '../types/screening.dto';
import { SelectMovieModel } from './Select_movie_model';
import SeatNote from './SeatNote';
import image_seat from '../assets/images/seat/seat_available.svg'
import image_sealectedSeat from '../assets/images/seat/seat_selected.svg'
import bookIcon from '../assets/booked.svg'
import image_notAvialable from '../assets/images/seat/not_avialable.svg'
import { Seat } from './Seat';
import SearchBar from './SearchBar';
import logo from '../assets/cinema/logo_icon.png'
import cinema_icon from '../assets/cinema/cinema_icon.png'
import cinema_logo from '../assets/cinema/cinema_logo.png'
import { getAccessToken, getRefreshToken, getUserInfor } from '../services/auth';





const CinemaShowTimeDetail = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().substring(0, 10);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id')

  // check token:
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  const userInfo = getUserInfor()

  // const [data, setData] = useState<CinemaResponse_includeScreening | null>(null)
  const [showDate, setShowDate] = useState(currentDate)
  const [dateArray, setDateArray] = useState<string[] | []>([])
  const [screeningDataPerDay, setScreeningDataPerDay] = useState<ScreeningDataPerDay[]>([])
  // const [movieId, setMovieId] = useState('')

  //cinema
  const [cinema, setCinema] = useState<CinemaResponse | null>(null);
  // seat:
  const [showSeat, setShowSeat] = useState(false)
  const [selectSeat, setSelectSeat] = useState<any>([])
  const [movieId, setMovieId] = useState('')
  const [movie, setMovie] = useState<MovieResponse | null>(null);
  const [reserveData, setReserveData] = useState<any | []>([])
  const [seatIdOfScreen, setSeatIdOfScreen] = useState<any>([])
  // const [reserveDataToStorage, setReserveDataToStorage] = useState<any | []>([])


  // screen:
  const [screenId, setScreenId] = useState<null | string>(null)
  const [oneScreening, setOnceScreening] = useState<EachScreeningResponse | null>(null)
  // const [showSchedule, setShowSchedule] = useState<boolean>(false)
  // section:
  const [showSection, setShowSection] = useState('')

  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

  // search:
  const [search, setSearch] = useState('')


  //return (

  useEffect(() => {
    // fect singleMovie data:
    const fechMovieData = async () => {
      const res = await getMovieById(movieId || "")
      let movieData = await res.json()
      setMovie(movieData);
    }
    fechMovieData()

    // fect seat of the screening:
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
      let seatData = await res.json()
      setOnceScreening(seatData)
    }
    fechOneScreenData()

    const fectAllScreeningOfCinema = async () => {
      const res = await getAllScreeningOfCampusId(id || "")
      let responseData = await res.json()
      const arrayDates: string[] | [] | "" = responseData.map((screen: any) => screen.date_show.split('T')[0]);
      const toSet = new Set(arrayDates);
      const uniqueDatesArray: string[] = Array.from(toSet);
      console.log("distinctDates:", uniqueDatesArray);


      // we want to show only 3days after today:
      setDateArray(uniqueDatesArray.slice(0, 3));
    }

    const fectScreeningOfCinemaFilterDate = async () => {
      const res = await getAllMovieByCampusIdFilterDate(id || "", showDate)
      let responseData = await res.json()
      setScreeningDataPerDay(responseData)
    }

    // for scroll section(whenever value of showSecton change --> this function is called)
    const scrollToSection = () => {
      scroller.scrollTo(showSection, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -100 //
      });
    };

    // fetch one cinema
    const fetchOneCinema = async () => {
      const res = await getOneCinema(id?.toString() || "")
      setCinema(await res.json())
    };
    scrollToSection()
    fectAllScreeningOfCinema()
    fectScreeningOfCinemaFilterDate()
    // fectDateCinema()
    fetchOneCinema()
  }, [id, movieId, screenId, reducerValue, showDate, showSection])



  // handle click seat:
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



  const handleShowUpSeat = async (id: string) => {
    if (!accessToken || !refreshToken || !userInfo) {
      setTimeout(
        () => navigate('/signup'),
        1500
      );
      return
    }
    setShowSection('seat_section')
    setScreenId(id)
    setShowSeat(true)
    setSelectSeat([])   // when click another schedule then previous selected will remove
  }

  // handle add reserve data to localStorage
  const handleAddReserveDataToLocalStorage = (updatedSeatIdOfScreen: SingleSeatRespone[]) => {
    const updatedBookingData = reserveData?.map((reserve: any) => {
      if (reserve.screeningId === screenId) {
        if (reserve.seat.length === 0) {
          return
        }
        // Update the existing reservation's selectedSeat property
        return {
          screeningId: screenId,
          cinema: cinema?.name,
          movie: movie?.title,
          image: movie?.image,
          price: movie?.price,
          showDate: oneScreening?.date_show,
          showTime: oneScreening?.startTime,
          num: selectSeat.length,
          payStatus: true,
          seat: updatedSeatIdOfScreen.filter((seat: SingleSeatRespone) => seat.status === "SELECTED")
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
        cinema: cinema?.name,
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




  // console.log(`Data of CinemaId ${id}:`, data);
  // console.log("dateArray:", dateArray);
  // console.log("CurrentDate:", currentDate);
  // console.log("Current movie:", movie);
  // console.log("screeningDataPerDay:", screeningDataPerDay);
  return (
    <div className='mx-auto bg-gradient-to-r from-red-900 to-purple-900 min-h-screen '>
      <div className="container flex-grow w-full py-4 sm:py-16 mx-auto">
        <div className="py-5 mt-10 flex flex-row items-center">
          <img src={cinema_logo} alt='logo' className='h-28 w-28  ' />
          <h1 className="text-5xl ml-3 uppercase my-10 font-black animate-text bg-gradient-to-r from-orange-500  via-cyan-400 to-blue-500 text-transparent bg-clip-text animate-gradient">{cinema?.name}</h1>
        </div>

        <div className="flex flex-row jus py-4 mt-10">

          {
            dateArray?.map((date: string, index: number) => (
              <div className='flex flex-row items-center'>
                <button
                  key={index}
                  onClick={() => {
                    setShowDate(date)
                    setShowSeat(false)  // this when we select change date --> showUpSeat dissapear
                    setScreenId('')
                    // console.log("Date selected on:", date);
                  }}
                  className={`bg-[#130B2B] mx-2 w-28 hover:bg-white font-normal text-sm hover:text-black py-2 px-8 border border-white-500 hover:border-transparent rounded ${showDate === date ? 'bg-yellow-500 text-black' : 'text-white'} `}
                > {currentDate === date
                  ? 'Today'
                  : formatDateToShortCurt(date)}
                </button>
                {
                  date === currentDate ? (<ArrowBackIosIcon className=' mx-4 text-white ' />) : (null)
                }
              </div>
            ))
          }
        </div>
        <div className='h-screen'>
          <div className="md:max-w-4xl">
            <SearchBar search={search} onChange={setSearch} placeHolder='search' />
          </div>
          {
            screeningDataPerDay?.filter(
              ((item: any) => {
                return search?.toLocaleLowerCase() === ""
                  ? item
                  : item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              })
            )
              .map((item: any, index: number) => (
                item.Screening.length === 0 ? null : (
                  <ScheduleOfCinema
                    key={index}
                    id={id || ""}
                    image={item?.image || movieDefault}
                    title={item?.title || "No Name"}
                    opening_date={item?.opening_date}
                    duration_min={item?.duration_min}
                    sub_title={item?.sub_title}
                    movieType={item?.movieType || "N/A"}
                    // onClick={() => { console.log("Hello"); }}
                    onClick={(screeningId: string, movieId: string) => {
                      setMovieId(movieId)
                      handleShowUpSeat(screeningId)
                    }}
                    screeningData={item?.Screening}
                    movie={item?.movie}
                    showUpScreenId={screenId || ""}
                  />
                )
              ))
          }
        </div>
        {/* show Seat */}
        {
          showSeat ? (
            <Element name="seat_section" className='mt-20 md:flex-row h-screen'>
              <div className="flex flex-row ">
                <div className="flex flex-row">
                  {/*  Select Seat */}
                  <div style={{ perspective: '600px' }} className="h-screen -5 bg-slate-800 flex flex-col justify-center items-center rounded-xl py-5">
                    {/* Screen */}
                    <div className=" screen rounded-t-[0%] rounded-b-[0%] " style={{ transform: 'rotateX(-30deg)' }}></div>
                    {/* Sreen End */}
                    {/* <div className="grid grid-cols-3 content-start mx-4 my-10"> */}
                    <div className="flex flex-col my-10 overflow-y-auto h-4/5">
                      {
                        seatIdOfScreen?.map((itemRow: any, indexRow: number) => (
                          <div className='flex flex-row justify-evenl place-items-center px-10'>
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
                    cinema={cinema?.name || ""}
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

        {/* Address */}
        <div className="flex flex-row justify-between mt-40">
          <div className="flex flex-col py-5">
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

          <div className='rounded-xl'>
            <iframe className='rounded-xl' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7818.122797793772!2d104.9343772!3d11.5474534!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109512eac99f311%3A0x357b789190b76c34!2sMajor%20Cineplex%20Aeon%20Mall%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1689706866262!5m2!1sen!2skh"
              width="600" height="300" loading="lazy">
            </iframe>
          </div>
        </div>
        {/* Address End */}
      </div>

    </div>
  )
}

export default CinemaShowTimeDetail
