import { getAccessToken } from "./auth";

// let URL = import.meta.env.VITE_BASE_URL_LOCAL
let URL = import.meta.env.VITE_BASE_URL
export const getAllCinema = async () => {
    const res = await fetch(`${URL}/campus`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return res
}

export const getOneCinema = async (id: string) => {
    const res = await fetch(`${URL}/campus/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return res
}


export const getAllMovieScreeningOfCampusId = async (id: string) => {
    const res = await fetch(`${URL}/campus/${id}?filter=movie`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return res
}


export const getAllScreeningOfCampusId= async (id: string) => {
    const res = await fetch(`${URL}/campus/${id}?filter=date`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return res
}
