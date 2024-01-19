import axios from 'axios';

const rootAPI = import.meta.env.VITE_ROOT_API
const userAPI = rootAPI + "/users"
const catAPI = rootAPI + "/categories"

const getAccessJWT = () => {
    return sessionStorage.getItem("accessJWT")
}
const getRefreshJWT = () => {
    return localStorage.getItem("refreshJWT")
}
const apiProccessor = async({method, url, data, isPrivate, refreshToken}) => {
    try {
        const token = refreshToken ? getRefreshJWT() : getAccessJWT()
        const headers = {
            Authorization: isPrivate ? token : null
        }
        const response = await axios({
            method,
            url,
            data,
            headers,
        })

        return response.data;

    } catch (error) {

        if(error.response?.data?.message.includes("jwt expired")){
            const { accessJWT } = await fetchNewAccessJWT();
            if(accessJWT) {
                sessionStorage.setItem("accessJWT", accessJWT);
                return apiProccessor({method, url, data, isPrivate, refreshToken});
            }
            

        }
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

//request new accessJWT
export const fetchNewAccessJWT = (data) => {
    return apiProccessor({
        method: 'get',
        url: userAPI + "/get-accessjwt",
        isPrivate: true,
        refreshToken: true,
    })
}

export const logoutUser = (_id) => {
    return apiProccessor({
        method: 'post',
        url: userAPI + "/logout",
        data: {
            _id,
            accessJWT: getAccessJWT(),
            refreshToken: getRefreshJWT(),
        },
    })
}

//request OTP
export const requestOTP = (email) => {
    return apiProccessor({
        method: 'post',
        url: userAPI + "/request-otp",
        data: {
            email,
        },
    })
}

//update password
export const resetPassword = (data) => {
    return apiProccessor({
        method: 'patch',
        url: userAPI,
        data,
    })
}


export const updatePassword = (data) => {
    return apiProccessor({
        method: 'patch',
        url: userAPI + "/password",
        data,
        isPrivate: true,
    })
}

//update user profile
export const updateProfile = (data) => {
    return apiProccessor({
        method: 'patch',
        url: userAPI + "/user-profile",
        data,
        isPrivate: true,
    })
}

// =========== categories
// get categories
export const fetchCategories = (_id) => {
    return apiProccessor({
        method: 'get',
        url: _id ? catAPI + "/" + _id : catAPI,
        isPrivate: true,
    })
}

// post categories
export const postCategories = (data) => {
    return apiProccessor({
        method: 'post',
        url: catAPI,
        data,
        isPrivate: true,
    })
}

// update category
export const updateCategories = (data) => {
    return apiProccessor({
        method: 'put',
        url: catAPI,
        data,
        isPrivate: true,
    })
}

//delete category
export const deleteCategories = (_id) => {
    return apiProccessor({
        method: 'delete',
        url: catAPI + "/" + _id,
        isPrivate: true,
    })
}

