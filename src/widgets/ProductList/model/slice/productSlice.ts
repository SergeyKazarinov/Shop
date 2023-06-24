import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'shared/types/IProduct';
import getProducts from '../services/getProducts';
import { IProductSchema } from '../types/productSchema';

const initialState: IProductSchema = {
  products: [],
  error: '',
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
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
      });
  },
});

export const productActions = productSlice.actions;

export const productReducer = productSlice.reducer;
