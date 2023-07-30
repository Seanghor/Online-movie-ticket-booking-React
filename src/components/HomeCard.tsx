import React, { useState } from "react";
import { CardShadow } from "./Cards/Card_Shadow";
import { MovieTypeEnum } from "../types/enum.type";
import { idText } from "typescript";
import { useLocation } from "react-router-dom";


interface HomeCardProps {
    id: string
    image: string
    title: string
    trailer: string
    movieType: string
    duration_min: number
    movieStatus: string | MovieTypeEnum
}


export const HomeCard: React.FunctionComponent<HomeCardProps> = (props: HomeCardProps) => {
    const { id, image, title, trailer, movieType, movieStatus, duration_min } = props;


    const onClick_buy = (id: string) => {
        // setShow(true)
        window.location.href = `/movie/${id}?show=${true}`;
    }
    const onClick_seeMore = (id: string) => {
        // setShow(false)
        window.location.href = `/movie/${id}?show=${false}`;
    }

    return (
        <div className=" flex-shrink-0 mx-4 w-[160px]  relative overflow-hidden bg-slate-950 rounded-lg max-w-xs shadow-2xl border-cyan-100 
            hover:border-2
            group cursor-pointer items-start justify-start  transition-shadow hover:shadow-xl hover:shadow-black/30
            ">
            <div className="group relative cursor-pointer items-start justify-start overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                <div className="h-60 w-48">
                    <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                        src={image} alt="" />
                </div>
                <div className="flex items-start">
                    <CardShadow
                        trailer={trailer}
                        title={title}
                        movieType={movieType}
                        movieStatus={movieStatus.toString()}
                        duration_min={duration_min}
                        onClick1={() => { onClick_seeMore(id) }}
                        onClick2={() => { onClick_buy(id) }}
                    />
                </div>

            </div>
        </div>

    );
}

