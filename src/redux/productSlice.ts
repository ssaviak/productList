import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../types/product";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "./productThunks";

const handlePending = (state: ProductState) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (
  state: ProductState,
  action: PayloadAction<IProduct[]>
) => {
  state.loading = false;
  state.products = action.payload;
};

const handleRejected = (
  state: ProductState,
  action: PayloadAction<unknown, string, unknown, { message?: string }>
) => {
  state.loading = false;
  state.error = action.error.message || "Failed to perform action";
};

interface ProductState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    editProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, handleFulfilled)
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(createProduct.pending, handlePending)
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, handleRejected)
      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, handleRejected)
      .addCase(updateProduct.pending, handlePending)
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, handleRejected);
  },
});

export const { editProduct } = productSlice.actions;
export default productSlice.reducer;
