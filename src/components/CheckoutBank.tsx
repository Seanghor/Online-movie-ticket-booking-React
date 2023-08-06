import React, { useState } from 'react';
import ButtonLoading from './Buttons/ButtonLoading';
import { NotificationDialog } from './PopupDialog';
import dialog_icon_cross from '../assets/images/dialog/cross.svg'
import dialog_icon_tick from '../assets/images/dialog/tick.svg'
import { useNavigate } from 'react-router-dom';
// let CLIENT_ID = "AaIdMgqRpEw49AwLiGvNXZ9B3_dLlD4EQ5wSeLmmVQXIlYAmQTQoamiBrf6qI2d71yaMoqtLIW6Ao2hQ"
const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
console.log("CLIENT_ID:", CLIENT_ID);


interface CheckoutBankProps {
    amount: number
    onClickPay: Function
    paidFor: boolean
    icon_pay: string
    bg_normal: string
    bg_hover: string
    isLoadingPay: boolean
    isDisable: boolean
}
const CheckoutBank: React.FunctionComponent<CheckoutBankProps> = (props: CheckoutBankProps) => {
    const { onClickPay, paidFor, icon_pay, bg_normal, bg_hover, isLoadingPay, isDisable } = props
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    if (paidFor) {
        return (<NotificationDialog
            isOpen={true}
            main_title={"You have successfully purchased ticket"}
            discription={"Thank you for choosing Avatar Cineplex! We appreciate your purchase of the movie ticket and hope you enjoy the cinematic experience."}
            icon={dialog_icon_tick}
            onClick={() => { setTimeout(() => navigate('/'), 1500) }}
        />)
        // alert("Thank you for your purches.")
    }
    if (error) {
        setError(error)
        return (
            <NotificationDialog
                isOpen={true}
                main_title={"Something went wrong"}
                discription={"Something went wrong, please contact to our support team."}
                icon={dialog_icon_cross}
                onClick={() => { setTimeout(() => navigate(''), 500) }}
            />)
    }
    return (
        <div >
            {
                !isLoadingPay
                    ? (
                        <button disabled={isDisable} onClick={() => onClickPay()} className={`bg-[]  transition-shadow hover:shadow-xl hover:shadow-black/30 border-slate-500 shadow-xl p-5 flex h-12 w-40 rounded-3xl hover:bg-[${bg_hover}] bg-[${bg_normal}]  items-center justify-center`}>
                            <img src={icon_pay} style={{ height: "" }} alt="" className="scale-75 object-cover rounded-lg items-center justify-center " />
                        </button>)
                    : (<ButtonLoading />)
            }
        </div>

    );
};

export default CheckoutBank;