import { toast } from "react-toastify";
import { setCatList } from "./categorySlice";
import { fetchCategories, postCategories } from "../../helper/axiosHelper";

export const getAllCats = () => async (dispatch) => {
  const { status, categories } = await fetchCategories();
  if (status === "success") {
    dispatch(setCatList(categories));
  }
};

export const postNewCat = (obj) => async (dispatch) => {
  const pending = postCategories(obj);
  toast.promise(pending, {
    pending: "please wait...",
  });

  const { status, message } = await pending;
  toast[status](message);
  status === "success" && dispatch(getAllCats());
};