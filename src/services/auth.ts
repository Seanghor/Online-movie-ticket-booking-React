import { Token } from "typescript";
import { LoginInput } from "../types/auth.dto";
import { getUserProfile } from "./user";
import { CreateBookingDto } from "../types/booking.dto";

let URL = import.meta.env.VITE_BASE_URL
console.log("URL:", URL);

export const isAuth = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
        return false
    }
    return true
};


export const logIn = async (loginBody: LoginInput) => {
    const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginBody),
    })

    const loginResponse = await res.json()
    console.log(res.status);
    if (loginResponse.accessToken && loginResponse.refreshToken) {
        // Store access token in localStorage
        setAccessToken(loginResponse.accessToken)
        setRefreshToken(loginResponse.refreshToken)

        // set userInfo into local storage
        const profile = await getUserProfile()
        setUserInfor(JSON.stringify(profile))

        // get reserve:
        const getData = localStorage.getItem("reserve")
        console.log("LocalStorage:", getData);
        if (getData === null) {
            // set reserve data:
            const emptyArray: CreateBookingDto[] | [] = [];
            const emptyArrayString = JSON.stringify(emptyArray);
            // Store the JSON string in localStorage
            localStorage.setItem('reserve', emptyArrayString);
        }


        // console.log("profile:", profile);
        // console.log("Get AcctessToken:", getAccessToken());
        // console.log("get userInfo:", profile);
    }
    return loginResponse;
};


export const logOut = async () => {
    const userInfo = JSON.parse(getUserInfor() || "")
    console.log("userInfo:", userInfo);
    // remove access and refreshToken from local storage:
    removeAccessToken()
    removeRefreshToken()
    removeUserInfo()
    localStorage.removeItem('reserve')
};
// export const logOut = async () => {

// }



export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await fetch(`${URL}/refreshToken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken }),
    })
    const response = await res.json()
    console.log("Refresh Token:", response);
    setAccessToken(response.accessToken)
    setRefreshToken(response.refreshToken)

    return response
}


export const revokeToken = async (userId: string) => {
    const res = await fetch(`${URL}/revokeToken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId }),
    })
    const response = await res.json()
    return response
}

// Function to check if access token has expired
export const checkAccessTokenExpiration = async () => {
    const tokenExpiration = localStorage.getItem('accessToken');
    if (!tokenExpiration) {
        return;
    }
    console.log("Start checking token .....");
    const decode = JSON.parse(atob(tokenExpiration.split('.')[1]));
    console.log("decode:", decode);
    const expTime = decode.exp * 1000
    const currentTime = new Date().getTime()

    console.log('Time Expired:', expTime < currentTime);
    return expTime < currentTime
};


// set to local storage ---------------------------------------------------
export const setAccessToken = (accessToken: any) => {
    return localStorage.setItem('accessToken', accessToken);
}
export const setRefreshToken = (refreshToken: any) => {
    return localStorage.setItem('refreshToken', refreshToken);
}
export const setUserInfor = (userInfor: any) => {
    return localStorage.setItem('userInfo', userInfor);
}

// get from local storage
export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}
export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
}
export const getUserInfor = () => {
    return localStorage.getItem('userInfo');
}

// remove from local storage
export const removeAccessToken = () => {
    return localStorage.removeItem('accessToken');
}
export const removeRefreshToken = () => {
    return localStorage.removeItem('refreshToken');
}
export const removeUserInfo = () => {
    return localStorage.removeItem('userInfo');
}