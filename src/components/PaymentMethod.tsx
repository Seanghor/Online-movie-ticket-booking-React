import React from "react";
import paypal_logo from '../assets/paypal.svg'
import tick_icon from '../assets/tick.svg'
import untick_icon from '../assets/paymentMethod_icon/unTick.svg'

interface PaymentMethodProps {
    id: number
    logo: string
    title: string
    description: string
    inUse: boolean
    onCLick: Function
}

export const PaymentMethod: React.FunctionComponent<PaymentMethodProps> = (props: PaymentMethodProps) => {
    const { id, logo, title, description, inUse, onCLick } = props;
    return (
        <div onClick={() => onCLick(id)} className={`bg-gray-300 w-96 h-20 rounded-xl hover:shadow-2xl ${inUse ? "border-2 border-lime-800" : ""}`}>
            <div className="flex flex-row justify-between items-center px-4 ">
                <div className="flex flex-row justify-center items-center">
                    <div className="w-14 h-10 relative flex items-center justify-center my-5">
                        <img src={logo} alt="" className="object-cover w-full h-full rounded-lg" />
                    </div>
                    <div className="ml-4 justify-center items-center relative  hover:text-white ">
                        <div className="flex flex-col justify-center">
                            <span className={"block font-semibold text-sm text-cyan-950 "}>{title}</span>
                            <span className="block  rounded-2xl text-gray-500 text-sm font-normal  py-2 leading-none items-center">{description}</span>
                        </div>
                    </div>
                </div>
                <div className="justify-center items-center text-center w-7 h-7">
                    <img src={inUse ? tick_icon : untick_icon} alt="" className="object-cover w-full h-full rounded-lg" />
                </div>

            </div>

        </div>

    );
}

