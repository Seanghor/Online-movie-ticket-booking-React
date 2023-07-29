import { log } from 'console';
import { CreateBookingDto } from "../types/booking.dto";
import { checkAccessTokenExpiration, getAccessToken, refreshAccessToken } from "./auth";

export async function booking(createBookingDto: CreateBookingDto) {
    let URL = import.meta.env.VITE_BASE_URL
    // let URL = import.meta.env.VITE_BASE_URL_LOCAL

    // check if accressToken is expire then --> refresh it
    const isAuth = await checkAccessTokenExpiration()
    console.log("isAuth:", !isAuth);
    if (isAuth) {
        await refreshAccessToken()
        console.log("Token refreshed ...");
    }
    const res = await fetch(`${URL}/booking`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(createBookingDto),
    });

    const response = await res.json()
    const statusCode = response.statusCode
    return response
}