import { PaymentMethodEnum } from "./enum.type";

export interface CreatePurchaseDto {
    total: number;
    phoneNumber: string,
    payMentMethod: string | PaymentMethodEnum,
    remark: string | null,
    bookings: {
        connect: { id: number }[]
    }
}
