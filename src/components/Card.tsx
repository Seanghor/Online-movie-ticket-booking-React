import React from "react";


interface MovieCardProps {
    image: string
    title:string
}
const formatName=(title:string) => {
    const shortenedTitle = title.slice(0, 20) + "...";
    return shortenedTitle
  }
export const Card: React.FunctionComponent<MovieCardProps> = (props: MovieCardProps) => {
    const { image,title} = props;
    return (
        <div className="hover:border-2 border-cyan-100 flex-shrink-0 m-4 w-48  relative overflow-hidden bg-slate-950 rounded-lg max-w-xs shadow-2xl  ">
            <div className="relative flex items-center justify-center">
                <img src={image} alt="" className="w-48 h-60 object-cover object-center" />
            </div>
            <div className="relative text-white px-3 pb-6 mt-4 hover:text-white ">
                <div className="flex flex-col justify-between">
                    <span className={"block font-semibold text-sm"}>{formatName(title)}</span>
                    <span className="block  rounded-2xl text-yellow-400 text-lg font-normal px-3 py-2 leading-none flex items-center">6:00PM</span>
                </div>
            </div>
        </div>

    );
}

