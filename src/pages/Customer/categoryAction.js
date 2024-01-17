import {toast} from 'react-toastify';
import { fetchCategories, postCategories } from '../../helper/axiosHelper';

export const getAllCats = () => async(dispatch) => {
    const { status, message } = await fetchCategories();
    if (status === "success") {
        dispatch(setCatList(categories));

    }
}

export const postNewCat = (obj) => async(dispatch) => {
    const pending = postCategories(obj)
    toast.promise(pending, {
        pending: "Please Wait..."
    })

    const {status, message} = await pending;
    toast[status](message);
    status === "success" && dispatch(getAllCats());
}