import { CreateFeedbackDto } from "../types/feedback.dto";
import { checkAccessTokenExpiration, getAccessToken, refreshAccessToken } from "./auth";

export const createFeedback = async (createFeedbackDto: CreateFeedbackDto) => {
    let URL = import.meta.env.VITE_BASE_URL
    console.log("URL:", URL);

    // let URL = import.meta.env.VITE_BASE_URL_LOCAL

    // check if accressToken is expire then --> refresh it
    const isAuth = await checkAccessTokenExpiration()
    console.log("isAuth:", !isAuth);
    if (isAuth) {
        await refreshAccessToken()
        console.log("Token refreshed ...");
    }
    const res = await fetch(`${URL}/feedback`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(createFeedbackDto),
    });


    return res
}