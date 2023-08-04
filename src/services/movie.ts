import { getAccessToken } from "./auth";
import { MovieStatusEnum } from "../types/enum.type";
let URL = import.meta.env.VITE_BASE_URL
// let URL = import.meta.env.VITE_BASE_URL_LOCAL
// const URL = "http://localhost:5000"
export const getAllMovie = async () => {
    console.log("BASE_URL:", URL);

    const res = await fetch(`${URL}/movie`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return res
}


export const getAllMovieOnScreening = async () => {
    console.log("BASE_URL:", URL);

    const res = await fetch(`${URL}/movie?onscreening=true`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    })
    return res
}


export const getAllMovieFilterByTitle = async (title?: string) => {
    const res = await fetch(`${URL}/movie?title=${title}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
            // Authorization: `Bearer ${process.env.REACT_APP_token}`
        },
    });
    return res;
}

export const getAllMovieFilterByStatus = async (status?: string) => {
    const res = await fetch(`${URL}/movie?status=${status}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
            // Authorization: `Bearer ${process.env.REACT_APP_token}`
        },
    });
    return res;
}

export const getAllMovieFilterIsTop = async (isTop?: string) => {
    const res = await fetch(`${URL}/movie?isTop=${isTop}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
            // Authorization: `Bearer ${process.env.REACT_APP_token}`
        },
    });
    return res;
}

export const getAllMovieFilterByTitleAndStatus = async (title?: string, status?: MovieStatusEnum) => {
    const res = await fetch(`${URL}/movie?title=${title}&&status=${status}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
            // Authorization: `Bearer ${process.env.REACT_APP_token}`
        },
    });
    return await res.json();
}




export const getMovieById = async (id: string) => {
    const res = await fetch(`${URL}/movie/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        }
    })
    // console.log("getMovieById:", res.status);
    return res
}


export const getAllMovieByCampusIdFilterDate = async (id: string, date: string) => {
    const res = await fetch(`${URL}/movie?campusId=${id}&&date=${date}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return res
}
