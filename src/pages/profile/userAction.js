import { fetchAUser, fetchNewAccessJWT } from "../../helper/axiosHelper"
import { setAdmin } from "./userSlice";

export const getUserProfile = () => async(dispatch) => {
    const resp = await fetchAUser();

    if(resp?.user){
        //send user to redux
        dispatch(setAdmin(resp.user))
    }
}

export const autoLogin = () => async(dispatch) => {
    //check if we have accessJWT, then fetch user

    const accessJWT = sessionStorage.getItem("accessJWT")

    if (accessJWT) {
        return dispatch(getUserProfile());
    }

    const refreshJWT = localStorage.getItem("refreshJWT")
    // get accessJWT
    // api call 
    
    if (refreshJWT) {
        const token = await fetchNewAccessJWT();
        if (token?.accessJWT){
            sessionStorage.setItem("accessJWT", token?.accessJWT);
            dispatch(getUserProfile())
        }
    }
}