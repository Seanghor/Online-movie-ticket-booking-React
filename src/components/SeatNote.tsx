import image_availableSeat from '../assets/images/seat/seat_available.svg'
import image_selectedSeat from '../assets/images/seat/seat_selected.svg'
import image_unavailableSeat from '../assets/images/seat/not_avialable.svg'
import bookIcon from '../assets/booked.svg'
const SeatNote: React.FunctionComponent = () => {
    return (
        <div className="grid grid-cols-4 gap-2  place-items-center pt-8 md:max-w-4xl">
            <div className="inline-flex items-center">
                <img src={image_availableSeat} alt="" width={40} />
                <p className="text-white text-lg px-5">Available</p>
            </div>
            <div className="inline-flex items-center">
                <img src={image_selectedSeat} alt="" width={40} />
                <p className="text-white text-lg px-5">Selected</p>
            </div>
            <div className="inline-flex items-center">
                <img src={bookIcon} alt="" width={40} />
                <p className="text-white text-lg px-5">Reserved</p>
            </div>
            <div className="inline-flex items-center">
                <img src={image_unavailableSeat} alt="" width={40} />
                <p className="text-white text-lg px-5">Unavailable</p>
            </div>
        </div>
    )
}

export default SeatNote
