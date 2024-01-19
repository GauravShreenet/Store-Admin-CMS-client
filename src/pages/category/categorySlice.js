import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catList: [],
  selectedCat: {},
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCatList: (state, { payload = [] }) => {
      state.catList = payload;
    },
    setACat: (state, { payload }) => {
      state.selectedCat = payload;
    }
  },
});

const { reducer, actions } = categorySlice;

export const { setCatList, setACat } = actions;
export default reducer;