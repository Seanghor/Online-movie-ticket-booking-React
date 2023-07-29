import { AuditurimResponse } from "./auditurim.dto";
import { MovieStatusEnum } from "./enum.type";

export interface EachScreeningResponse {
    id: number,
    movieId: string,
    auditoriumId: string,
    date_show: Date | string,
    duration_min: number,
    startTime: string,
    endTime: Date | string,
    status: MovieStatusEnum,
    isAvailable: boolean,
    createdAt: Date,
    updatedAt: Date,
    auditorium: AuditurimResponse
}


export interface DifferentDateScreeningResponse {
    date: string,
    group: EachScreeningResponse[]
}

export interface DifferentCinemaScreeningResponse {
    id: number,
    name: string,
    address: string | null,
    phone: string | null,
    map: string | null
    Screening: {
        date: string
        auditoriumId: string
        group: {
            id: number,
            movieId: string,
            auditoriumId: string,
            date_show: Date | string,
            duration_min: number,
            startTime: string,
            endTime: Date | string,
            status: MovieStatusEnum,
            isAvailable: boolean,
            createdAt: Date,
            updatedAt: Date,
        }[]
    }[]
}
