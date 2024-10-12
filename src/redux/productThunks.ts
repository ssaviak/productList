import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../types/product";
import {
  fetchProducts as fetchProductsFromAPI,
  addProduct as addProductAPI,
  deleteProduct as deleteProductAPI,
  updateProduct as updateProductAPI,
} from "../api/client";

export const fetchProducts = createAsyncThunk<IProduct[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetchProductsFromAPI();
    return response;
  }
);

export const createProduct = createAsyncThunk<IProduct, IProduct>(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await addProductAPI(product);
      return response;
    } catch (error) {
      return rejectWithValue("Failed to add product");
    }
  }
);

export const deleteProduct = createAsyncThunk<string, string>(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteProductAPI(productId);
      return productId;
    } catch (error) {
      return rejectWithValue("Failed to delete product");
    }
  }
);

export const updateProduct = createAsyncThunk<IProduct, IProduct>(
  "products/update",
  async (product, { rejectWithValue }) => {
    try {
      const response = await updateProductAPI(product);
      return response;
    } catch (error) {
      return rejectWithValue("Failed to update product");
    }
  }
);
