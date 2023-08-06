import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { formatDateTo_dd_mm_yy } from "../../utils/utils";

interface MovieCardProps {
    image: string
    title: string
    opening_date: string | Date
    onClick: Function
}
export const Card: React.FunctionComponent<MovieCardProps> = (props: MovieCardProps) => {
    const { image, title, opening_date, onClick } = props;
    return (
        <div onClick={() => onClick()} className="shadow-cyan-500/50 h-[350px] hover:border-2 border-cyan-100 flex-shrink-0 m-4 w-56  relative overflow-hidden bg-slate-950 rounded-lg max-w-md shadow-2xl">
            <div className="relative flex h-72 items-center justify-center">
                <img src={image} alt="" className="w-full h-full object-cover object-center scale-95 rounded-t-lg hover:scale-105" />
            </div>
            <div className="relative text-white px-3 pb- mt-2 hover:text-white">
                <div className="flex flex-col justify-between w-full">
                    <span className="block font-semibold text-sm capitalize truncate h-5 font-poppins">{title}</span>
                    <div className="flex flex-row items-center text-sm mt-">
                        <CalendarMonthIcon className="mr-1 text-[#22d3ee]" sx={{ fontSize: "20px" }} />
                        <span className="block font-poppins rounded-2xl text-[#22d3ee] text-sm font-normal px-3 py-2 leading-none items-center">
                            {formatDateTo_dd_mm_yy(opening_date.toString())}
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
}

