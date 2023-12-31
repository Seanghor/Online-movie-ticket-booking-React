
import React, { useState } from 'react';
// import CinemaImg from '../assets/cinema.jpg';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import ButtonLoading from './Buttons/ButtonLoading';
import { NotificationDialog } from './PopupDialog';
import dialog_icon_cross from '../assets/images/dialog/cross.svg'
import dialog_icon_tick from '../assets/images/dialog/tick.svg'
import { useNavigate } from 'react-router-dom';


// let CLIENT_ID = "AaIdMgqRpEw49AwLiGvNXZ9B3_dLlD4EQ5wSeLmmVQXIlYAmQTQoamiBrf6qI2d71yaMoqtLIW6Ao2hQ"
const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
// console.log("CLIENT_ID:", CLIENT_ID);



interface PayPalCheckoutProps {
    amount: number
    onClickPay: Function
    paidFor: boolean
    isLoadingPay: boolean
    isDisable: boolean
}
const PayPalCheckout: React.FunctionComponent<PayPalCheckoutProps> = (props: PayPalCheckoutProps) => {
    const { amount, onClickPay, paidFor, isLoadingPay, isDisable } = props
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    if (paidFor) {
        return (<NotificationDialog
            isOpen={true}
            main_title={"You have successfully purchased ticket"}
            discription={"A small river named Duden flows by their place and supplies it with the necessary regelialia"}
            icon={dialog_icon_tick}
            onClick={() => { setTimeout(() => navigate('/'), 1500) }}
        />)
        // alert("Thank you for your purches.")
    }
    if (error !== null) {
        console.log("---------- Error:", error);

        return (<NotificationDialog
            isOpen={true}
            main_title={"Something went wrong"}
            discription={"Something went wrong, please contact to our support team."}
            icon={dialog_icon_cross}
            onClick={() => { setTimeout(() => navigate('')) }}

        />)
        // alert(error)
    }
    return (
        <div className='max-w-md mx-auto w-40' >
            {
                !isLoadingPay ? (
                    <PayPalScriptProvider options={{ "clientId": CLIENT_ID }}>
                        {/* <PayPalButtons disabled={isDisable}
                        style={{
                            layout: "horizontal",
                            height: 48,
                            tagline: false,
                            shape: "pill"
                        }}
                        // onClick:
                        // onClick={(actions: any, data: any) => {
                        //     // const hasAlreadyBought = true
                        //     if (paidFor) {
                        //         setError("You already book this ticket, get your ticket now")
                        //         return actions.reject()
                        //     }
                        //     else {
                        //         // return actions.resolve()
                        //         return (<NotificationDialog
                        //             isOpen={true}
                        //             main_title={"Something went wrong"}
                        //             discription={"Something went wrong, please contact to our support team."}
                        //             icon={dialog_icon_cross}
                        //             onClick={() => { setTimeout(() => navigate('')) }}

                        //         />)
                        //     }
                        // }}
                        // createOrder
                        createOrder={(data: any, actions: any) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: amount.toLocaleString(),
                                        },
                                    },
                                ],
                            });
                        }}
                        // onApprove
                        onApprove={async (actions: any, data: any) => {
                            console.log("APPROVED")
                            const order = await actions.order.capture()
                            return onClickPay()
                        }}

                        // 
                        onCancel={() => {

                        }}
                        // OnError
                        onError={(err: any) => {
                            setError(err);
                            console.error("Paypal checkout error:", err)
                        }}
                    /> */}
                        <PayPalButtons
                            disabled={isDisable}
                            style={{
                                layout: "horizontal",
                                height: 48,
                                tagline: false,
                                shape: "pill"
                            }}
                            // onClick:
                            onClick={(_data: any, actions: any) => {
                                // const hasAlreadyBought = true
                                if (paidFor) {
                                    setError("You already book this ticket, get your ticket now")
                                    return actions.reject()
                                } else {
                                    return actions.resolve()
                                }
                            }}
                            // createOrder
                            createOrder={(_data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: amount.toLocaleString(),
                                            },
                                        },
                                    ],
                                });
                            }}
                            // onApprove
                            onApprove={async (_data: any, actions: any) => {
                                await actions.order.capture()
                                onClickPay()
                                return actions.order.capture().then((_details: any) => {
                                    // alert(`Transaction completed by ${name}`);
                                });


                            }}

                            // 
                            onCancel={() => {

                            }}
                            // OnError
                            onError={(err: any) => {
                                setError(err);
                                console.error("Paypal checkout error:", err)
                            }}
                        />
                    </PayPalScriptProvider>) : (
                    <ButtonLoading />
                )
            }

        </div>

    );
};

export default PayPalCheckout;