import { useEffect, useReducer, useState } from 'react';
import CinemaImg from '../assets/cinema.jpg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WeekendIcon from '@mui/icons-material/Weekend';
import { PaymentMethod } from '../components/PaymentMethod';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatDateDayAndMonth, formatTimeTo12Hour } from '../utils/utils';
import PayPalCheckout from '../components/PayPalCheckout';
import CheckoutBank from '../components/CheckoutBank';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { CreateBookingDto } from '../types/booking.dto';
import { booking } from '../services/booking';
import { CreatePurchaseDto } from '../types/purchase.dto';
import { createPurchase } from '../services/purchase';
import { Checkbox, Typography, Input } from "@material-tailwind/react";
import CloseIcon from '@mui/icons-material/Close';

// -- method:
import paypal_logo from '../assets/images/bank//paypal.svg'
import aba_logo from '../assets/images/bank//aba.png'
import acleda_logo from '../assets/images/bank//acleda.png'
import philip_logo from '../assets/images/bank/philip.jpg';
// -- icon:
import aba_payment_icon from '../assets/paymentMethod_icon/aba_icon.svg'
import acleda_payment_icon from '../assets/paymentMethod_icon/acleda_icon.png'
import philip_payment_icon from '../assets/paymentMethod_icon/philip_icon.png'


let CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
console.log("CLIENT_ID:", CLIENT_ID);





type BookingProps = {
  cinema: string,
  movie: string;
  image: string;
  price: number;
  screeningId: number,
  num: number,
  seat: {
    id: number,
    customId: string,
    price: number
  }[]
};

type payMethod = {
  id: number,
  method: string;
  enum: string;
  logo: string;
  bg_normal: string,
  bg_hover: string,
  icon_pay: string,
  description: string,
  status: boolean,

};
const paymentMethods = [
  {
    id: 1,
    method: "PayPal",
    enum: "PAYPAL",
    logo: paypal_logo,
    bg_normal: "",
    bg_hover: "",
    description: "Tap to pay with PayPal",
    status: false
  },
  {
    id: 2,
    method: "ABA PAY",
    enum: "ABA",
    icon_pay: aba_payment_icon,
    logo: aba_logo,
    bg_normal: "#015e7b",
    bg_hover: "#184661",
    description: "Tap to pay with ABA Bank",
    status: false
  },
  {
    id: 3,
    method: "ACLEDA PAY",
    enum: "ACLEDA",
    logo: acleda_logo,
    bg_normal: "#143c6d",
    bg_hover: "#0e2e52",
    icon_pay: acleda_payment_icon,
    description: "Tap to pay with ACLEDA Bank Account",
    status: false
  },
  {
    id: 4,
    method: "PhilipBank",
    enum: "PHILIP",
    logo: philip_logo,
    bg_normal: "#Ffffff",
    bg_hover: "#E6e5e4",
    icon_pay: philip_payment_icon,
    description: "Tap to pay with Philip Bank",
    status: false
  }
] as payMethod[]
const BillingDetailPage = () => {
  // payment id:
  const [payId, setPayId] = useState<number | null>(1)
  const [chooseMethod, setChooseMethod] = useState<payMethod | null>(null)
  const [bookReserveData, setBookReserveData] = useState<BookingProps[] | []>([])
  const [arrayBookingDto, setArrayBookingDto] = useState<CreateBookingDto[] | []>([])
  const [paidFor, setPaidFor] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [remark, setRemark] = useState("")
  const [phone, setPhone] = useState("")
  const [agree, setAgree] = useState(false)
  const [showButton, setShowButton] = useState<boolean>(false)
  const [isLoadingPay, setIsLoadingPay] = useState<boolean>(false)

  // refresh:
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => {
    const fectBooking = () => {
      const res = localStorage.getItem('reserve')
      let resData = JSON.parse(res || "[]") as BookingProps[]

      // set data:
      setBookReserveData(resData)

      // setTotal price:
      let amount = resData.reduce((acc, screening) => {
        const selectedSeats = screening.seat
        const totalPriceForScreening = selectedSeats.length * screening.price;
        return acc + totalPriceForScreening;
      }, 0);
      setTotalPrice(amount)

      // generate array of bookingDto:
      const createBookingDtoArray = resData.map((item) => {
        // Extract the required properties from 'item'
        const { screeningId, seat } = item;
        // Extract 'id' from each 'seat' object and create 'selectedSeat' array
        const selectedSeat = seat?.map((seatData) => seatData.id);
        const num = seat.length
        // setPaidFor(true)
        // Create the new object in 'CreateBookingProps' format
        return {
          screeningId,
          num,
          payStatus: true,
          selectedSeat,
        } as unknown as CreateBookingDto
      });
      setArrayBookingDto(createBookingDtoArray)
    }
    fectBooking()
  }, [reducerValue])

  const calculateTotalPriceOfEachMovie = (num: number, price: number) => {
    const sum = num * price
    return sum.toFixed(2)
  }
  // create booking api
  async function handleCreateBooking(bookingDto: CreateBookingDto) {
    const res = await booking(bookingDto)
    return res
  }
  // create purchase api
  async function handlePurchase(purchaseDto: CreatePurchaseDto) {
    const res = await createPurchase(purchaseDto)
    return res

  }
  // handle click payment method:
  const handleClickPaymentMethod = (id: number) => {
    setPayId(id)

    let choosen = paymentMethods.find((method: payMethod) => method.id === id)
    setChooseMethod(choosen || null)
    console.log("choosen:", choosen);


  }

  // handle PayPalCheckout:
  const handlePay = async () => {
    setIsLoadingPay(true)
    setTimeout(
      async () => {
        setIsLoadingPay(false)
        const resCreateBookingData = await Promise.all(
          arrayBookingDto.map(async (createSingleBooking: CreateBookingDto) => {
            return await handleCreateBooking(createSingleBooking);
          })
        );
        setIsLoadingPay(true)
        let purchaseData = {
          total: totalPrice,
          phoneNumber: phone,
          payMentMethod: chooseMethod?.enum,
          remark: remark,
          bookings: {
            connect: resCreateBookingData.map((singleBook: any) => { return { id: singleBook.id } })
          }
        } as CreatePurchaseDto
        console.log("purchaseData:", purchaseData);

        const resCreatePurchaseData = await handlePurchase(purchaseData)
        console.log("resCreatePurchaseData:", resCreatePurchaseData);
        if (resCreatePurchaseData.ok !== true) {
          return;
        }
        // set reserve data:
        const emptyArray: CreateBookingDto[] | [] = [];
        const emptyArrayString = JSON.stringify(emptyArray);

        // Store the JSON string in localStorage
        localStorage.setItem('reserve', emptyArrayString);
        setPaidFor(true)
        // Dispatch a custom event to notify the Navbar component
        const event = new Event('reservationUpdated');
        window.dispatchEvent(event);
        forceUpdate()
      },
      1500
    );

    // if (paidFor) {
    //   alert("Thank you for your purches.")
    // }
    // if (error) {
    //   alert(error)
    // }


   
  }


  const handleRemove = async (screenId: string) => {
    const newArrayReserve = bookReserveData.filter((screen: any) => screen.screeningId !== screenId)
    setBookReserveData(newArrayReserve)
    console.log("newArrayReserver:", newArrayReserve);
    setBookReserveData(newArrayReserve)
    localStorage.setItem("reserve", JSON.stringify(newArrayReserve))
    const event = new Event('reservationUpdated');
    window.dispatchEvent(event);
  }

  console.log('ShowButton:', bookReserveData);

  return (
    <div className="mx-auto w-full h-full bg-gradient-to-r from-red-900 to-purple-900 min-h-screen font-sans">
      <img src={CinemaImg} alt="" className='w-full h-96 object-cover' />

      <div className="container w-full h-full pt-48 sm:py-16 mx-auto mt-10 items-center">

        <div className="flex w-full h-full flex-col md:flex-row ">
          {/* Left Side Bill form */}
          <div className=" bg-[#faf5ff] md:w-1/2 h-1/2 py-10 px-10 rounded-lg "> {/* bg-[#faf5ff]*/}
            <div className="md:w-full py-5 rounded-lg shadow-md border-slate-200  bg-white px-4">
              <h4 className='font-semibold'>Payment Method</h4>
              <div className=''>
                {
                  paymentMethods.map((method: any, index: number) => (
                    <div key={index} className='mt-4'>
                      <PaymentMethod
                        id={method.id}
                        logo={method?.logo}
                        title={method?.method}
                        description={method?.description}
                        inUse={method?.id === payId ? true : false}
                        onCLick={handleClickPaymentMethod}
                      />
                    </div>
                  ))
                }

              </div>
            </div>
            <div className='shadow-md mt-4'>
              {/* Phone Number Input */}
              <div className="mb-4 bg-white p-4 rounded-lg">
                <label className="block text-gray-700 font-bold mb-5" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  placeholder='Phone number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4 shadow mt-4 p-4 rounded-lg bg-white px-4">
              <label className="block text-gray-700 font-medium mb-5" htmlFor="remark">
                Other
              </label>
              <Input
                variant="outlined"
                label="Remark"
                className="shadow appearance-none   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
              {/* <div className="w-72 h-72 ">
                <Input label="Username" className='border-2 border-red-500' />
              </div> */}
            </div>
            <div className='flex flex-col'>
              <Checkbox onClick={() => { setAgree(!agree) }} className='border-2 border-gray-500'
                label={
                  <Typography color="blue-gray" className="flex font-medium">
                    I agree with the
                    <Typography
                      as="a"
                      href="#"
                      color="blue"
                      className="font-medium transition-colors hover:text-blue-700"
                    >
                      &nbsp;terms and conditions
                    </Typography>
                    .
                  </Typography>
                }
              />

              {/* Endchose method */}

              <button
                onClick={() => { setShowButton(true) }}
                disabled={agree && phone && payId ? false : true}
                // className={agree && phone && payId
                //   ? `mt-2 text-white bg-[#db2777] font-semibold hover:text-white
                // py-2 px-10 border border-blue hover:border-transparent rounded uppercase`
                //   : `mt-2 text-white bg-slate-400  font-semibold hover:text-white
                //   py-2 px-10 border border-blue hover:border-transparent rounded uppercase`
                // }

                className={
                  `mt-2 text-white font-semibold hover:text-white
                py-2 px-10 border border-blue hover:border-transparent rounded uppercase ${agree && phone && payId && !showButton ? "bg-[#db2777]" : showButton ? "bg-[#852852]" : "bg-slate-400"}`

                }
              >
                Save & Continue
              </button>
            </div>
          </div>
          {/* Bill Form End */}


          {/* Total Summary */}
          <div className="px-20 md:w-2/3 max-h-screen items-start  md:mt-0 font-sans pb-10 ">
            <div className=" w-full h-full mx-auto border border-gray-400  p-10 rounded-md bg-[#faf5ff] "> {/** bg-[#faf5ff] */}
              <div className=" flex flex-row justify-between">
                <div className='flex flex-row items-center'>
                  <div className='bg-slate-400 flex justify-center items-center w-7 h-7 rounded-full mr-2'>
                    <ConfirmationNumberIcon className="" sx={{ fontSize: "18px" }} />
                  </div>
                  <h2 className="uppercase  text-lg font-normal text-[#3b0764] font-poppins">Booking Summary</h2>
                </div>
                <p className="uppercase text-lg font-normal text-[#3b0764] font-sans">Subtotal</p>
              </div>
              <div className='h-3/5 overflow-y-auto mt-5 '>
                {bookReserveData?.map((movie: any, index: number) => (
                  <div key={index} className="mb-4 max-h-80 bg-stone-200 rounded-lg px-4 py-2">
                    <div className="flex items-center mb-2 justify-between">
                      <div className="flex items-center">
                        <img src={movie?.image} alt={movie.title} className="w-20 h-24 rounded-md mr-4" />
                        <div className="flex flex-col justify-between w- mx-2">
                          <div className='w-80'>
                            <h3 className="font-medium text-[#9333ea] text-lg font-sans uppercase">{movie?.movie}</h3>
                          </div>
                          <div className='flex flex-row items-center text-xs  font-mono'>
                            <LocationOnIcon className="mr-1" sx={{ fontSize: "15px" }} />
                            <p className='text-blue-800 font-mono font-semibold'>{movie?.cinema}</p>
                          </div>
                          <div className='flex flex-row items-center text-sm'>
                            <CalendarMonthIcon className="mr-1" sx={{ fontSize: "13px" }} />
                            <p className='font-mono'>{formatDateDayAndMonth(movie?.showDate)}</p>
                          </div>

                          <div className="flex flex-row items-center text-sm">
                            <AccessTimeIcon className="mr-1" sx={{ fontSize: "13px" }} />
                            <p className="font-mono">{formatTimeTo12Hour(movie?.showTime)}</p>
                          </div>
                          <div className='flex flex-row items-center'>

                            {/* <span className='text-gray-600 font-medium text-xs'>SEAT:</span> */}
                            <WeekendIcon className="mr-1" sx={{ fontSize: "15px" }} />
                            <p className='text-xs text-gray-600 font-medium font-mono '>   {
                              movie?.seat?.map((eachSeat: any) => eachSeat?.customId).join(', ')
                            }</p>

                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row">
                        <h3 className="font-normal text-lg">
                          <span className=''>${movie.price}</span>
                          <span className='px-2'>x</span>
                          <span className='text-red-600'>{movie.seat.length}</span>
                        </h3>
                        <p className="text-[#9333ea] font-normal text-lg ml-5">${calculateTotalPriceOfEachMovie(movie.price, movie.seat.length)}</p>
                      </div>

                      <div
                        onClick={() => { handleRemove(movie.screeningId) }}
                        className="flex flex-row items-center w-10 pr-2">
                        <CloseIcon className="ml-3 text-gray-500 hover:text-red-500 hover:w-8 hover:h-8" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-10'>
                <div className="flex justify-between">
                  <span className="font-bold text-[#3b0764] text-lg uppercase">Total :</span>
                  <span className="font-bold text-[#db2777] text-2xl">${totalPrice.toFixed(2)}</span>
                </div>
                <hr className="my-4" />
              </div>

              {/* --------------------------- */}
              <div className='flex flex-col rounded-md h-40 py-5'>
                <div className=''>
                  <p className='font-poppins px-4 text-sm text-gray-500'>
                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purpose described in our privacy policy.
                  </p>
                </div>
                {/* <ButtonLoading /> */}

                <div className='flex flex-col justify-center items-center mt-10'>
                  {
                    payId === 1
                      ? (<PayPalCheckout
                        amount={totalPrice}
                        onClickPay={() => handlePay()}
                        paidFor={paidFor}
                        isLoadingPay={isLoadingPay}
                        isDisable={showButton ? false : true}
                      />) : (
                        <CheckoutBank
                          amount={500}
                          icon_pay={chooseMethod?.icon_pay || ""}
                          onClickPay={() => { handlePay() }}
                          paidFor={paidFor}
                          bg_normal={chooseMethod?.bg_normal || ""}
                          bg_hover={chooseMethod?.bg_hover || ""}
                          isLoadingPay={isLoadingPay}
                          isDisable={showButton ? false : true}
                        />)
                  }
                </div>

              </div>
            </div>
          </div>
          {/* Total Summary End */}

        </div>

      </div>
    </div >

  );
};

export default BillingDetailPage;