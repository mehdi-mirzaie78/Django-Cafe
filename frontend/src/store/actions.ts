import { ThunkAction } from "redux-thunk";
import Product from "../entities/Product";
import APIClient from "../services/apiClient";
import {
  getProductsFailure,
  getProductsRequest,
  getProductsSuccess,
} from "./productsSlice";
import { RootState } from "./rootReducer";
import { AxiosError } from "axios";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  any
>;

export const getProducts = (): AppThunk<void> => async (dispatch) => {
  const apiClient = new APIClient<Product>("/products/");
  try {
    dispatch(getProductsRequest());
    const data = await apiClient.getAll();
    dispatch(getProductsSuccess(data));
  } catch (error) {
    const axiosError = error as AxiosError;
    dispatch(getProductsFailure(axiosError.message));
  }
};
