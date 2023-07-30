interface CursorPreviousProp {
    onClick: Function
}
export const CursorButtonPrevious: React.FunctionComponent<CursorPreviousProp> = (props: CursorPreviousProp) => {
    const { onClick } = props
    return (
        <button
            className="mx-5 absolute top-1/2 left-0 transform -translate-y-1/2 z-[1] flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300 focus:outline-none"
            onClick={() => onClick()}
        >
            <span className="sr-only">Previous</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>

    )
}