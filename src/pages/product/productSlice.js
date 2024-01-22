import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  selectedProduct: {},
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, { payload = [] }) => {
      state.productList = payload;
    },
    setAProduct: (state, { payload }) => {
      state.selectedProduct = payload;
    }
  },
});

const { reducer, actions } = productSlice;

export const { setProductList, setAProduct } = actions;
export default reducer;