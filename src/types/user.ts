import { GenderEnum } from "./enum.type";

export interface RegisterInput {
    name: string,
    email: string,
    password: string,
    gender: GenderEnum
}