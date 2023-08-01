import { useEffect, useState } from "react";
import { ScreeningStatusEnum } from "../types/enum.type";
import CinemaIcon from '../assets/cinema_icon.svg';
import { formatTimeTo12Hour } from "../utils/utils";
import full from '../assets/booking/movieFull.png'


export interface ScreeningProps {
    name: string,
    Screening: {
        date: string | Date
        auditoriumId: string
        group: {
            id: string
            // movieId: string
            // auditoriumId: string
            // date_show: string | Date
            // duration_min: number
            startTime: string | Date
            // endTime: string | Date
            // status: string | ScreeningStatusEnum
            isAvailable: boolean
            // createdAt: string | Date
            // updatedAt: string | Date
        }[]
    }[],
    onClick: Function
    showUpScreenId: string | null // for click show up 
}



export const ShowTimeSchedule: React.FunctionComponent<ScreeningProps> = (props: ScreeningProps) => {
    // eslint-disable-next-line @typescript-eslint/no-redeclare
    const { name, onClick, Screening, showUpScreenId } = props


    // const [isCloseMov, setIsCloseMov] = useState(false)
    // useEffect(() => {

    // }, [])
    return (
        <>
            <div className="flex flex-row justify-between  bg-[#130B2B] backdrop-blur-lg shadow-lg border p-4 my-9 rounded-lg  md:flex-row md:max-w-4xl ">

                <div>
                    <div className="flex flex-row">
                        <h6 className="font-bold font-['poppins] text-lg text-white pb-4">{name}</h6>
                    </div>

                    <div className="flex flex-row">
                        <img src={CinemaIcon} alt="" className='w-20 mr-10 py-4' />
                        <div className="border-l border-gray-300"></div>

                        <div className="flex flex-row pt-8 pl-5">
                            <div className="flex-col justify-between">
                                <div className="flex flex-row justify-between">
                                    {
                                        Screening?.map((item: any, index: number) => (
                                            <div key={index} className="">
                                                <h6 className="text-sm mb-5 text-white text-start">THEATRE {item?.auditoriumId}</h6>
                                                <div className="flex flex-row gap-4">
                                                    {item.group.map((screen: any, index2: number) => (
                                                        <button
                                                            key={index2}
                                                            disabled={false}
                                                            // onClick={() => { onClick() }}
                                                            onClick={() => onClick(screen.id)}
                                                            className={`text-white w-28 rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 
                                                        ${screen.isAvailable
                                                                    ? "bg-transparent hover:bg-white hover:border-transparent  hover:text-black text-white-700 font-semibold py-2 px-4 border border-white-500  rounded"
                                                                    : "rounded-md bg-rose-400 text-slate-900"} 
                                                                ${screen.id === showUpScreenId
                                                                    ? 'bg-white text-zinc-950'
                                                                    : ''}`}
                                                        // className={`${screen.id.toString() == showUpScreenId ? 'bg-amber-500' : 'bg-slate-100'}`}
                                                        >
                                                            {formatTimeTo12Hour(screen.startTime.toString())}
                                                        </button>

                                                    ))}
                                                </div>

                                            </div>
                                        )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    Screening?.map((item: any) => {
                        return item.group.every((scr: any) => scr.isAvailable === false) ? (<div>
                            <img className="object-cover w-full rounded-t-lg h-20 md:rounded-none md:rounded-l-lg" src={full} alt="" />
                        </div>) : (null)
                    })
                }
            </div >

        </>
    );
}