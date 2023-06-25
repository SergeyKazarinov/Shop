import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICategory } from 'shared/types/ICategory';
import { ICategoriesSchema } from '../types/categoriesSchema';
import getCategories from '../services/getCategories';

const initialState: ICategoriesSchema = {
  categories: [],
  error: '',
  isLoading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearErrorMessage: (state) => {
      state.error = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategories.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const categoriesActions = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
