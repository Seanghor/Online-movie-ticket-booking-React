import button from "@material-tailwind/react/theme/components/button";
import React from "react";


interface CursorNextProp {
    onClick: Function
}
export const CursorButtonNext: React.FunctionComponent<CursorNextProp> = (props: CursorNextProp) => {
    const { onClick } = props
    return (
        <button
            className="mx-5 absolute top-1/2 right-0 transform -translate-y-1/2 z-[1] flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300 focus:outline-none"
            onClick={() => onClick()}
        >
            <span className="sr-only">Next</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>

    )
}