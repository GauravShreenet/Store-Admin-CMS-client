import { toast } from "react-toastify";
// import { setACat, setCatList } from "./categorySlice";
import { fetchProducts, postProducts } from "../../helper/axiosHelper";
import { setAProduct, setProductList } from "./productSlice";

export const getAllProducts = () => async (dispatch) => {
  const { status, products } = await fetchProducts();
  if (status === "success") {
    dispatch(setProductList(products));
  }
};

export const getAProduct = (_id) => async(dispatch) => {
  const {status, products } = await fetchProducts(_id)
  if(status === 'success') {
    dispatch(setAProduct(products))
  }
}

export const postNewProduct = (obj) => async (dispatch) => {
  const pending = postProducts(obj);
  toast.promise(pending, {
    pending: "please wait...",
  });

  const { status, message } = await pending;
  toast[status](message);
  status === "success" && dispatch(getAllProducts());
};

// export const updateACat = (obj) => async (dispatch) => {
//   const pending = updateCategories(obj);
//   toast.promise(pending, {
//     pending: "please wait...",
//   })

//   const { status, message } = await pending;
//   toast[status](message);
//   if (status === "success") {
//     dispatch(getAllCats());
//     dispatch(setACat({}));
//   } 
// }

// export const deleteCat = (_id) => async (dispatch) => {
//   const pending = deleteCategories(_id);
//   toast.promise(pending, {
//     pending: "Please Wait..."
//   })

//   const { status, message } = await pending;
//   toast[status](message);

//   if(status === 'success'){
//     dispatch(getAllCats());
//     return true;
//   }
  
// }
