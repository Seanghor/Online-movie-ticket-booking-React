import React from "react";


interface UserProps {
    image: string
    onClick: any
    username: string
    email: string
    isProfileOn: boolean
    // isSelected: boolean
}

// export const Seat: React.FunctionComponent<SeatProps> = (props: SeatProps) => {
export const UserLogo: React.FunctionComponent<UserProps> = (props: UserProps) => {
    const { image, onClick, username, email, isProfileOn } = props
    // const [toggleShow, settoggleShow] = useState<boolean>(isProfileOn)

    return (
        // <div className="flex flex-row items-center md:order-2 space-x-3 nav-profile mx-5"
        //     onClick={() => onClick()}>
        //     <div className="relative">
        //         <div className="h-10 w-10 rounded-full cursor-pointer overflow-hidden">
        //             <img
        //                 className="h-full w-full object-cover"
        //                 src={image}
        //                 alt="User Profile"
        //             />
        //         </div>

        //     </div>
        //     <div className="text-white font-poppins">{username}</div>
        // </div>
        <div className="w-full">
            <button  id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" className="w-40 flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 mr-2 rounded-full" src={image} alt="user photo" />
                {username}
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            {
                isProfileOn ? (<div id="dropdownAvatarName" className={`absolute  z-10  bg-white  divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div className="font-medium ">Pro User</div>
                        <div className="truncate text-xs">{email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                        <li>
                            <a href="/bill_detail" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Booking Summary</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                    </ul>
                    <div className="py-2">
                        <a href="/login" onClick={() => onClick()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </div>
                </div>) : (null)
            }
        </div>
    );
}

