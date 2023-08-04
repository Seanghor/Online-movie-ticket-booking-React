import React from "react";
// import image_seat from '../assets/seat.svg'
// import image_text from '../assets/text.svg'
// import image_notAvialable from '../assets/not_avialable.svg'
// import image_user from '../assets/user.svg'

interface SeatProps {
    image: string
    onClick: any
    title: string
    isDisbled: boolean
    // isSelected: boolean
}

// export const Seat: React.FunctionComponent<SeatProps> = (props: SeatProps) => {
export const Seat: React.FunctionComponent<SeatProps> = (props: SeatProps) => {
    const { image, onClick, title, isDisbled } = props
    return (
        <div className="hover:cursor-pointer" >
            <button
                className={``}
                disabled={isDisbled}
                onClick={onClick}>
                <div className="relative flex items-center justify-center">
                    <img src={image} width={30} height={30} />
                </div>
                <h6 className="text-orange-400 text-xs">{title}</h6>
            </button>
        </div>

    );
}

