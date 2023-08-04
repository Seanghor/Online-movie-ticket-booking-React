
import { RegisterInput } from "../types/user";
import { getAccessToken, setAccessToken, setRefreshToken, setUserInfor } from "./auth";

let URL = import.meta.env.VITE_BASE_URL
// let URL = import.meta.env.VITE_BASE_URL_LOCAL
export const getUserProfile = async () => {
    const res = await fetch(`${URL}/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return await res.json();
}



export const registerUser = async (registerBody: RegisterInput) => {
    const res = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerBody),
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

        // set reserve data:
        const emptyArray: never[] = [];
        const emptyArrayString = JSON.stringify(emptyArray);
        // Store the JSON string in localStorage
        localStorage.setItem('reserve', emptyArrayString);
        // console.log("profile:", profile);
        // console.log("Get AcctessToken:", getAccessToken());
        // console.log("get userInfo:", profile);
    }
    return loginResponse;
};

