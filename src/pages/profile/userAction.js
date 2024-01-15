import { fetchAUser } from "../../helper/axiosHelper"
import { setAdmin } from "./userSlice";

export const getUserProfile = () => async(dispatch) => {
    const resp = await fetchAUser();

    if(resp?.user){
        //send user to redux
        dispatch(setAdmin(resp.user))
    }
}