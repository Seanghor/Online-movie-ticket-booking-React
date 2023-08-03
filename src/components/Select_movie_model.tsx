import React from "react";
import GradeIcon from '@mui/icons-material/Grade';
import TimerIcon from '@mui/icons-material/Timer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CategoryIcon from '@mui/icons-material/Category';
import image_seat from '../assets/seat.svg'
import image_text from '../assets/text.svg'
import image_notAvialable from '../assets/not_avialable.svg'
import image_user from '../assets/user.svg'
import { MovieTypeEnum } from "../types/enum.type";
import { IconButton } from "./Icon_Button";
import { Link, NavLink, useLocation } from "react-router-dom";
import croos_img from '../assets/croos.svg'
import { formatDateDayAndMonth, getDayNumber, getMonthName } from "../utils/utils";
import CloseIcon from '@mui/icons-material/Close';

function formatTimeTo12Hour(timeString: string) {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return formattedTime;
}


interface SelectMovieModel_props {
    title: string
    image: string
    movieType: string | MovieTypeEnum
    movieDate: string | Date
    duration_min: number
    auditoruim: string
    showDate: string | Date
    timeShow: string | Date
    cinema: string
    selected: {
        id: string,
        customId: string,
        price: number
    }[],
    onClickSubmit: Function,
    onClickCancelSeat: Function,
    onClickReserve: Function

}

// export const Seat: React.FunctionComponent<SeatProps> = (props: SeatProps) => {
export const SelectMovieModel: React.FunctionComponent<SelectMovieModel_props> = (props: SelectMovieModel_props) => {
    const { image, cinema, title, movieType, movieDate, duration_min, auditoruim, showDate, timeShow, selected, onClickCancelSeat, onClickSubmit, onClickReserve } = props

    return (
        <div className="flex flex-row">
            <div className="flex flex-col  w-72 h-80">
                <div className="flex flex-col ">
                    <div className=" w-72 shadow-xl  border-1 border-collapse rounded-lg border-indigo-900">
                        <img className="object-cover w-full h-full rounded-lg" src={image} alt="" />
                    </div>
                    <h1 className={cinema && cinema.length <= 20 ? "text-left text-blue-100 font-bold p-2 text-lg" : "text-left text-blue-100 font-bold p-2 text-xs "}>
                        {cinema}
                    </h1>

                    <div className="w-72 h-64 mt-4  max-h-80 overflow-y-auto">
                        <div className="h-64">
                            {
                                selected.length === 0 ? (
                                    <div className="font-medium text-gray-400">Please Select</div>
                                ) : (selected.map((item: any, index: number) => (
                                    <div key={index} className="border-2 border-collapse rounded-lg border-indigo-500 mb-3 hover:cursor-pointer">
                                        <div className="flex flex-row h-12 justify-between items-stretch">
                                            <div className="flex flex-row items-center pl-4">
                                                <p className=" w-12 text-white font-mono text-2xl">{item?.customId[0]}</p>
                                                <p className=" text-white font-light text-base">row</p>
                                            </div>
                                            <div className="w-10 flex flex-row  items-center">
                                                <p className=" text-white font-mono text-2xl">{Number(item?.customId.slice(2))}</p>
                                                <p className=" text-white font-light text-base">th</p>
                                            </div>
                                            <div className="flex flex-row items-center">
                                                <p className=" text-white font-mono text-base">seat</p>
                                            </div>
                                            <div className="flex flex-row items-center ">
                                                <p className=" text-gray-400 font-light text-base">${item?.price}</p>

                                            </div>
                                            <div
                                                onClick={() => onClickCancelSeat(item.id)}
                                                className="flex flex-row items-center w-12 pr-2">
                                                {/* <img className="object-cover w-8 h-8 hover:w-10 hover:h-10" src={croos_img} alt="" /> */}
                                                <CloseIcon className="ml-3 text-white hover:text-red-500 hover:w-8 hover:h-8"/>
                                            </div>
                                        </div>
                                    </div>
                                )))
                            }
                        </div>
                    </div>
                </div>
                {
                    selected?.length === 0 ? (null) : (<div>
                        <div className="flex flex-row items-center justify-end pr-10">
                            <p className=" w-12 text-gray-400 font-normal text-base">Total</p>
                            <p className=" w-12 text-white font-mono text-xl">:</p>
                            <p className="w-14 text-white font-mono text-2xl"> {`$${selected?.reduce((total, item) => total + item.price, 0).toFixed(2)}`}</p>
                        </div>
                        <div className="w-72 mt-6">
                            <div className="flex flex-row justify-between ">
                                <IconButton
                                    title={"Cancel"}
                                    emoji={null}
                                    isTitleOnly={true}
                                    isIconOnly={false}
                                    onClick={() => onClickReserve()}
                                    isDisabled={false}
                                    className={`bg-transparent text-blue-700 text-xs font-semibold hover:text-blue-800  border border-blue-500 hover:border-blue-700 rounded `}
                                />
                                <IconButton
                                    title={"PAY NOW"}
                                    emoji={null}
                                    isTitleOnly={true}
                                    isIconOnly={false}
                                    onClick={() => onClickSubmit()}
                                    isDisabled={selected.length === 0}
                                    className={selected.length !== 0 ? `bg-red-600 text-white font-medium text-xs  hover:bg-red-700` : 'bg-gray-600 text-white font-medium text-xs  '}
                                />

                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className="w-28 ml-4">

                <div className="">
                    <h4 className="text-neutral-800 font-semibold text-left">Date:</h4>
                    <div className="bg-transparent border-slate-800  shadow-md text-neutral-900 font-semibold py-2 px-4 border  rounded  ">
                        <p className="text-4xl">{getDayNumber(showDate.toString())}</p>
                        <p className="uppercase ">{getMonthName(showDate.toString())}</p>
                    </div>
                </div>
                <div className="text-left border-zinc-800  shadow-md mt-4">
                    <h4 className="font-semibold text-neutral-800 ">Time</h4>
                    <p className="text-neutral-900 font-semibold px-6">{formatTimeTo12Hour(timeShow.toString())}</p>
                </div>
                <div className="text-left border-zinc-800  shadow-md mt-4">
                    <h4 className="font-semibold text-neutral-800 ">Theatre:</h4>
                    <p className="text-neutral-900 font-semibold px-6">{auditoruim}</p>
                </div>
            </div>

        </div>

    );
}

