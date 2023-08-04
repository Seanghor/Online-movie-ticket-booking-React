import {  ScreeningStatusEnum } from "./enum.type"
import { MovieResponse } from "./movie.dto"

export interface CinemaResponse {
    id: number,
    name: string,
    address: string | null,
    phone: string | null,
    map: string | null
}


export interface CinemaResponse_includeScreening2 {
    id: number,
    name: string,
    address: string | null,
    phone: string | null,
    map: string | null,
    group: {
        movieId: number,
        screening: {
            id: number,
            campusId: number,
            movieId: number,
            auditoruimId: number,
            date_show: Date,
            duration_min: number,
            startTime: Date,
            endTime: Date,
            status: ScreeningStatusEnum,
            isAvailable: boolean,
            movie: MovieResponse
        }[]
    }[]
}


export interface CinemaResponse_includeScreening {
    id: number,
    name: string,
    address: string | null,
    phone: string | null,
    map: string | null,
    group: GroupScreening_Of_Movie[]
}

export interface GroupScreening_Of_Movie {
    movieId: number,
    isAvailable: boolean,
    movie: MovieResponse
    screening: {
        id: number,
        campusId: number,
        movieId: number,
        auditoruimId: number,
        date_show: Date,
        duration_min: number,
        startTime: Date,
        endTime: Date,
        status: ScreeningStatusEnum,
        isAvailable: boolean,
        movie: MovieResponse
    }[]
}