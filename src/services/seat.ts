
import { UpdateStatusOfSeat } from "../types/seat.dto";
import { getAccessToken } from "./auth";

const URL = import.meta.env.VITE_BASE_URL
// let URL = import.meta.env.VITE_BASE_URL_LOCAL
export const getSeatOfAuditorum = async (id: string) => {
    const res = await fetch(`${URL}/seat?auditoriumId=${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    console.log("getSeatOfAuditorum --> Status:", res.status);
    return res
}


export const getSeatOfScreening = async (id: string) => {
    const res = await fetch(`${URL}/seat?screeningId=${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    // console.log("getSeatOfScreening --> Status:", res.status);
    return res
}

export const updateStatusOfSeat = async (id: number, status: UpdateStatusOfSeat) => {
    const res = await fetch(`${URL}/seat/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(status),
    });
    // console.log("updateStatusOfSeat --> Status:", res.status);
    return res
}


