import { CreatePurchaseDto } from "../types/purchase.dto";
import { checkAccessTokenExpiration, getAccessToken, refreshAccessToken } from "./auth";

export async function createPurchase(createPurchaseDto: CreatePurchaseDto) {
    let URL = import.meta.env.VITE_BASE_URL
    // let URL = import.meta.env.VITE_BASE_URL_LOCAL

    // check if accressToken is expire then --> refresh it
    const isAuth = await checkAccessTokenExpiration()
    console.log("isAuth:", !isAuth);
    if (isAuth) {
        await refreshAccessToken()
        console.log("Token refreshed ...");
    }
    const res = await fetch(`${URL}/purchase`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(createPurchaseDto),
    });

    // const response = await res.json()
    // const statusCode = response.statusCode
    return res
}