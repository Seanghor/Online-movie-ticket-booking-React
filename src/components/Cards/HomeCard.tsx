import React from "react";
import { CardShadow } from "./Card_Shadow";
import { MovieTypeEnum } from "../../types/enum.type";
import { useNavigate } from "react-router-dom";
import SkeletonHomePage from "../Skeleton/SkeletonHomePage";



interface HomeCardProps {
    id: string
    image: string
    title: string
    trailer: string
    movieType: string
    duration_min: number
    movieStatus: string | MovieTypeEnum
    isLoading: boolean
}


export const HomeCard: React.FunctionComponent<HomeCardProps> = (props: HomeCardProps) => {
    const navigate = useNavigate()
    const { id, image, title, trailer, movieType, movieStatus, duration_min, isLoading } = props;


    const onClick_buy = (id: string) => {
        // setShow(true)
        // window.location.href = `/movie/${id}?show=${true}`;
        navigate(`/movie/${id}?show=true`)
    }
    const onClick_seeMore = (id: string) => {
        // setShow(false)
        navigate(`/movie/${id}?show=false`)
        // window.location.href = `/movie/${id}?show=${false}`;
    }

    return (
        <>
            {isLoading ? (<SkeletonHomePage />) : (<div className="mr-5 flex-shrink-0 mx-0 w-44 h-64 relative overflow-hidden bg-slate-950 rounded-2xl max-w-xs shadow-2xl border-cyan-100 
            hover:border-2
            group cursor-pointer items-start justify-start transition-shadow hover:shadow-xl hover:shadow-black/30
            ">
                <div className="group relative cursor-pointer items-start justify-start overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                    <div className="h-64 w-44 justify-center items-center place-items-center">
                        <img className="h-full w-full bg-cover object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
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
            </div>)}
        </>

    );
}

