import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { convertMinutesToHHMM, formatDateTo_dd_mm_yy, formatTimeTo12Hour } from "../../utils/utils";

interface MovieCardProps {
    image: string
    title:string
    opening_date:string | Date
}
const formatName=(title:string) => {
    const shortenedTitle = title.slice(0, 20) + "...";
    return shortenedTitle
}



export const Card: React.FunctionComponent<MovieCardProps> = (props: MovieCardProps) => {
    const { image,title,opening_date} = props;
    return (
        <div className="shadow-cyan-500/50 h-[350px] hover:border-2 border-cyan-100 flex-shrink-0 m-4 w-56  relative overflow-hidden bg-slate-950 rounded-lg max-w-md shadow-2xl">
            <div className="relative flex items-center justify-center">
                <img src={image} alt="" className="w-56 h-60 object-cover object-center" />
            </div>
            <div className="relative text-white px-3 pb-6 mt-4 hover:text-white">
                <div className="flex flex-col justify-between w-full">
                    <span className="block font-semibold text-md capitalize truncate h-10 font-poppins">{title}</span>
                    <div className="flex flex-row items-center text-sm mt-3">
                    <CalendarMonthIcon className="mr-1 text-[#22d3ee]" sx={{ fontSize: "30px" }} />
                    <span className="block font-poppins rounded-2xl text-[#22d3ee] text-lg font-normal px-3 py-2 leading-none flex items-center">
                        {formatDateTo_dd_mm_yy(opening_date.toString())}
                    </span>
                    </div>
                </div>
            </div>
        </div>

    );
}

