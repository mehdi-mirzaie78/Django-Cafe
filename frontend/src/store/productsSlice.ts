import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../entities/Product";
import { FetchResponse } from "../services/apiClient";

interface ProductState {
  data: FetchResponse<Product>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: { count: 0, previous: null, next: null, results: [] },
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsRequest(state) {
      state.isLoading = true;
    },
    getProductsSuccess(state, action: PayloadAction<FetchResponse<Product>>) {
      state.isLoading = false;
      state.data = action.payload;
    },
    getProductsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getProductsRequest, getProductsSuccess, getProductsFailure } =
  productSlice.actions;

export default productSlice.reducer;
