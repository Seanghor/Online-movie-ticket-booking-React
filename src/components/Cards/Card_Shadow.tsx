import React from "react";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { convertFirstLetterToUpperCase, convertMinutesToHHMM, formatName } from "../../utils/utils";
import { MovieStatusEnum } from "../../types/enum.type";

interface CardShadowProps {
    trailer: string
    title: string
    movieType: string
    duration_min: number
    movieStatus: string | MovieStatusEnum
    onClick1: Function
    onClick2: Function
}
export const CardShadow: React.FunctionComponent<CardShadowProps> = (props: CardShadowProps) => {
    const { title, movieType, movieStatus, duration_min, onClick1, onClick2 } = props;
    return (
        <>
            <div className="flex items-start absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="mt-2 absolute inset-0 flex translate-y-[70%] flex-col items-start justify-start pl-4 pt-1 text-center transition-all duration-500 group-hover:translate-y-0">
                <PlayCircleOutlineIcon className="text-white " sx={{ fontSize: " 50px" }} />
                <div className="flex flex-row">

                </div>
                <p className="mb-3 pr-10 text-base text-left italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{convertFirstLetterToUpperCase(formatName(title, 15))}</p>

                <div className="flex flex-row items-center">
                    <LocalOfferIcon className="text-white mr-1" sx={{ fontSize: "15px" }} />
                    <p className="text-white text-sm">{movieType}</p>
                </div>
                <div className="flex flex-row  items-center">
                    <AccessTimeIcon className="text-white mr-1" sx={{ fontSize: "15px" }} />
                    <p className="text-white text-sm">{convertMinutesToHHMM(duration_min)}</p>
                </div>
                {/* <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button> */}
                <div className="flex flex-col mt-2">
                    <button
                        onClick={() => onClick1()}
                        className="text-xs bg-transparent hover:bg-blue text-white font-semibold hover:text-black py-1 px-2 border border-blue hover:bg-gray-100 rounded uppercase "
                    >
                        More Info
                    </button>
                    {
                        movieStatus === "NOW_SHOWING" ? (
                            <button
                                onClick={() => onClick2()}
                                className="text-xs mt-2 bg-transparent bg-amber-600 text-white font-semibold  py-1 px-2 border border-blue hover:bg-amber-700 rounded uppercase ">
                                Buy Now
                            </button>
                        ) : (null)
                    }
                </div>
            </div>
        </>

    );
}

