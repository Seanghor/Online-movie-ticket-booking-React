import React from "react";
import CinemaIcon from '../assets/cinema_icon.svg';
import cinema_icon from "../assets/cinema/cinema_icon.png"


interface CinemaBranchProps {
  branchName: string,
  address: string,
  phone: string
  map: string | null,
  onClickBtn1: Function
  onClickBtn2: Function

}

export const CinemaBranch: React.FunctionComponent<CinemaBranchProps> = (props: CinemaBranchProps) => {
  const { branchName, address, phone, onClickBtn1, onClickBtn2 } = props;
  return (
    <div className="flex flex-row py-10">
      <div className="flex">
        <img src={CinemaIcon} alt="" className='w-32 mr-10' />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row items-center m-2">
          <img src={cinema_icon} alt="cinema_icon" className="w-6 h-6 mr-2"/>
          <p className="text-orange-300 text-2xl font-bold  font-poppins" >{branchName}</p>
        </div>
        <p className="text-gray-100 text-1xl font-bold m-2 font-poppins">{address}</p>
        <p className="text-gray-100 text-1xl font-bold m-2 font-poppins">{phone}</p>

        <div className="flex flex-row button mt-3">
          <button
            onClick={() => onClickBtn1()}
            className="bg-transparent hover:bg-blue text-white font-semibold hover:text-black py-2 px-4 border border-blue hover:bg-gray-100 rounded uppercase "
          >
            More Info
          </button>
          <button

            onClick={() => { onClickBtn2() }}
            className="ml-3 text-white font-semibold bg-[#130B2B] backdrop-blur-lg shadow-lg border hover:text-black hover:bg-white rounded text-base px-4 py-2 text-center uppercase "
          >
            showtimes
          </button>
        </div>
      </div>
    </div>

  );
}

