import { MovieStatusEnum, MovieTypeEnum } from "./enum.type"
import { EachScreeningResponse } from "./screening.dto"

export interface MovieResponse {
    id: number | null,
    title: string | null,
    image: string | null,
    description: string | null,
    trailer: string | null,
    movieType: MovieTypeEnum | null,
    duration_min: number,
    rating: number | null,
    price: number | null,
    opening_date: string | Date,
    sub_title: string,
    status: MovieStatusEnum | null,
    createdAt: Date | null,
    updatedAt: Date | null,
}



export interface ScreeningDataPerDay {
    id: number | null,
    title: string | null,
    image: string | null,
    description: string | null,
    trailer: string | null,
    movieType: MovieTypeEnum | null,
    duration_min: number,
    rating: number | null,
    price: number | null,
    opening_date: string | Date,
    sub_title: string,
    status: MovieStatusEnum | null,
    createdAt: Date | null,
    updatedAt: Date | null,
    Screening: EachScreeningResponse[]
}

