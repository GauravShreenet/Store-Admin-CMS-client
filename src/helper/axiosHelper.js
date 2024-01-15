import axios from 'axios';

const rootAPI = import.meta.env.VITE_ROOT_API
const userAPI = rootAPI + "/users"

const getAccessJWT = () => {
    return sessionStorage.getItem("accessJWT")
}
const apiProccessor = async({method, url, data, isPrivate}) => {
    try {
        const headers = {
            Authorization: isPrivate ? getAccessJWT() : null
        }
        const response = await axios({
            method,
            url,
            data,
            headers,
        })

        return response.data;

    } catch (error) {
        return {
            status: 'error',
            message: error.message,
        }
    }
}

// ====================== user api
// create user
export const postNewAdmin = (data) => {
    return apiProccessor({
        method: 'post',
        url: userAPI,
        data,
    })
}

export const postVerifyEmail = (data) => {
    return apiProccessor({
        method: 'post',
        url: userAPI + "/verify-email",
        data,
    })
}

export const postSignIn = (data) => {
    return apiProccessor({
        method: 'post',
        url: userAPI + "/sign-in",
        data,
    })
}

export const fetchAUser = (data) => {
    return apiProccessor({
        method: 'get',
        url: userAPI,
        isPrivate: true,
    })
}

