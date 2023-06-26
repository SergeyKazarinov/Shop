import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'shared/types/IProduct';
import getProducts from '../services/getProducts';
import { IProductSchema } from '../types/productSchema';
import getProductById from '../services/getProductById';

const initialState: IProductSchema = {
  products: [],
  product: null,
  error: '',
  isLoading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(getProductById.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.product = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductById.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const productActions = productSlice.actions;

export const productReducer = productSlice.reducer;
