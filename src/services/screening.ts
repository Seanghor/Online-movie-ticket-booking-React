import { getAccessToken } from "./auth";

let URL = import.meta.env.VITE_BASE_URL
// let URL = import.meta.env.VITE_BASE_URL_LOCAL
// const URL = "http://localhost:5000"
export const getAllScreeningByMovieIdAndGroupByCinema = async (movieId: string) => {
    const res = await fetch(`${URL}/screening?movie=${movieId}&&groupBy=cinema`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return res
}

export const getAllScreeningByMovieIdAndGroupByDate = async (movieId: string) => {
    const res = await fetch(`${URL}/screening?movie=${movieId}&&groupBy=date`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return res
}

export const getAllScreeningByMovieIdAndDate = async (movieId: string,date:string) => {
    console.log("movie:", movieId);
    console.log("Date:", date);
    const res = await fetch(`${URL}/screening?movie=${movieId}&&groupBy=cinema&&date=${date}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return res
}

export const getOneScreeningById = async (id: string) => {
    const res = await fetch(`${URL}/screening/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return res
}
