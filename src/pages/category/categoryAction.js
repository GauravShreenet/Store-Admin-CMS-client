import { toast } from "react-toastify";
import { setACat, setCatList } from "./categorySlice";
import { deleteCategories, fetchCategories, postCategories, updateCategories } from "../../helper/axiosHelper";

export const getAllCats = () => async (dispatch) => {
  const { status, categories } = await fetchCategories();
  if (status === "success") {
    dispatch(setCatList(categories));
  }
};

export const getACat = (_id) => async(dispatch) => {
  const {status, categories} = await fetchCategories(_id)
  if(status === 'success') {
    dispatch(setACat(categories))
  }
}

export const postNewCat = (obj) => async (dispatch) => {
  const pending = postCategories(obj);
  toast.promise(pending, {
    pending: "please wait...",
  });

  const { status, message } = await pending;
  toast[status](message);
  status === "success" && dispatch(getAllCats());
};

export const updateACat = (obj) => async (dispatch) => {
  const pending = updateCategories(obj);
  toast.promise(pending, {
    pending: "please wait...",
  })

  const { status, message } = await pending;
  toast[status](message);
  if (status === "success") {
    dispatch(getAllCats());
    dispatch(setACat({}));
  } 
}

export const deleteCat = (_id) => async (dispatch) => {
  const pending = deleteCategories(_id);
  toast.promise(pending, {
    pending: "Please Wait..."
  })

  const { status, message } = await pending;
  toast[status](message);

  if(status === 'success'){
    dispatch(getAllCats());
    return true;
  }
  
}
