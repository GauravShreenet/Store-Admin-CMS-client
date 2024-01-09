import axios from 'axios';

const rootAPI = import.meta.env.VITE_ROOT_API
const userAPI = rootAPI + "/users"

const apiProccessor = async({method, url, data}) => {
    try {
        const response = await axios({
            method,
            url,
            data,
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
    return userAPI()
}

