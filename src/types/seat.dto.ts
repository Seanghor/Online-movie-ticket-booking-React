import { SeatStatusEnum } from "./enum.type";

export interface SingleSeatRespone {
    id: number;
    customId: string;
    status: SeatStatusEnum | string,
    screeningId: number,
    auditoriumId: number;
}

export type SingleRowOfSeat = SingleSeatRespone[]
export type SeatList = SingleSeatRespone[][]


export interface UpdateStatusOfSeat {
    status: SeatStatusEnum | string,
}

