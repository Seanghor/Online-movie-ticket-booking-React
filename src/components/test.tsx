import { useState } from "react";
import { ScreeningStatusEnum } from "../types/enum.type";

export interface ScreeningProps {
    date: Date | string,
    show_times: {
        auditorum: string
        time: string,
        isAvailable: boolean
        screeningId: string
    }[],
    onClick: Function
}
export interface ScreeningProps2 {
    id: string,
    name: string,
    address: string,
    phone: string | null,
    map: string | null,
    Screening: {
        date: string | Date
        group: {
            id: string
            movieId: string
            auditoriumId: string
            date_show: string | Date
            duration_min: number
            startTime: string | Date
            endTime: string | Date
            status: string | ScreeningStatusEnum
            isAvailable: boolean
            createdAt: string | Date
            updatedAt: string | Date
        }[]
    }[],
    onClick: Function
}

function formatTimeTo12Hour(timeString: string) {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return formattedTime;
}

export const TestComponent: React.FunctionComponent<ScreeningProps2> = (props: ScreeningProps2) => {
    // eslint-disable-next-line @typescript-eslint/no-redeclare
    const { id, name, address, onClick, phone, map, Screening } = props
    return (
        <>
            <div className=" flex flex-col bg-white border p-4 my-9 border-gray-100 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-100 dark:bg-gray-900 ">
                <div className="flex flex-col pr-5">
                    <h6 className="font-bold font-['poppins] text-lg text-white">{name}</h6>
                    <h6 className="mt-10 text-white text-4xl">Date</h6>
                </div>
                <div className="flex flex-row py-8">
                    <div className="flex-col justify-between">
                        {/* <h6 className="text-lg mb-5 text-white">Theatre 0</h6> */}
                        <div className="flex flex-row justify-between px-2 gap-4">
                            {
                                Screening?.map((item: any) => (
                                    item?.group?.map((screen: any, index: number) => (
                                        <div key={index}>
                                            <h6 className="text-sm mb-5 text-white">{screen?.auditorumId}</h6>
                                            <button
                                                disabled={false}
                                                // onClick={() => { onClick() }}
                                                onClick={() => onClick(screen?.id)}
                                                className={`text-white rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ${item.isAvailable ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-500"}`}
                                            >
                                                {formatTimeTo12Hour(screen.startTime.toString())}
                                            </button>
                                        </div>
                                    ))
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}