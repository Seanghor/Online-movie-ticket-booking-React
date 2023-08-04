import React, { useState } from 'react';
// import icon from '../assets/paymentMethod_icon/philip_icon.png'
let CLIENT_ID = "AaIdMgqRpEw49AwLiGvNXZ9B3_dLlD4EQ5wSeLmmVQXIlYAmQTQoamiBrf6qI2d71yaMoqtLIW6Ao2hQ"
console.log("CLIENT_ID:", CLIENT_ID);



interface CheckoutBankProps {
    amount: number
    onClickPay: Function
    paidFor: boolean
    icon_pay: string
    bg_normal: string
    bg_hover: string

}
const CheckoutBank: React.FunctionComponent<CheckoutBankProps> = (props: CheckoutBankProps) => {
    const {  onClickPay, paidFor, icon_pay, bg_normal, bg_hover } = props
    const [error, setError] = useState<string | null>(null)
    if (paidFor) {
        alert("Thank you for your purches.")
    }
    if (error) {
        setError('Error')
        alert(error)
    }
    return (
        <div onClick={() => onClickPay()} className={`bg-[] transition-shadow hover:shadow-xl hover:shadow-black/30 border-slate-500 shadow-xl p-5 flex h-12 w-40 rounded-3xl hover:bg-[${bg_hover}] bg-[${bg_normal}] items-center justify-center`}>
            <img src={icon_pay} style={{ height: "" }} alt="" className="scale-75 object-cover rounded-lg items-center justify-center " />
        </div>

    );
};

export default CheckoutBank;