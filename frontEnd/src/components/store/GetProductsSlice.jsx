import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsData = createAsyncThunk("api/productCall", async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/products/`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

const GetProductsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    list: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went Wronge";
      });
  },
});

export const { getAllProducts, loadingProducts, errorFetchProducts } =
  GetProductsSlice.actions;
export default GetProductsSlice.reducer;
