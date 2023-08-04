
import React, { useState } from 'react';
// import CinemaImg from '../assets/cinema.jpg';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
let CLIENT_ID = "AaIdMgqRpEw49AwLiGvNXZ9B3_dLlD4EQ5wSeLmmVQXIlYAmQTQoamiBrf6qI2d71yaMoqtLIW6Ao2hQ"
console.log("CLIENT_ID:", CLIENT_ID);



interface PayPalCheckoutProps {
    amount: number
    onClickPay: Function
    paidFor: boolean

}
const PayPalCheckout: React.FunctionComponent<PayPalCheckoutProps> = (props: PayPalCheckoutProps) => {
    const { amount, onClickPay, paidFor } = props
    const [error, setError] = useState<string | null>(null)
    if (paidFor) {
        alert("Thank you for your purches.")
    }
    if (error) {
        alert(error)
    }
    return (
        <div className='max-w-md mx-auto w-40'>
            <PayPalScriptProvider options={{ "clientId": "AaIdMgqRpEw49AwLiGvNXZ9B3_dLlD4EQ5wSeLmmVQXIlYAmQTQoamiBrf6qI2d71yaMoqtLIW6Ao2hQ" }}>
                <PayPalButtons
                    style={{
                        layout: "horizontal",
                        height: 48,
                        tagline: false,
                        shape: "pill"
                    }}
                    // onClick:
                    onClick={(data: any, actions: any) => {
                        // const hasAlreadyBought = true
                        console.log("data:", data);
                        
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
                        const order = await actions.order.capture()
                        console.log("Order:", order);
                        onClickPay()
                        return actions.order.capture().then((details: any) => {
                            const name = details.payer.name.given_name;
                            alert(`Transaction completed by ${name}`);
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
            </PayPalScriptProvider>
        </div>

    );
};

export default PayPalCheckout;