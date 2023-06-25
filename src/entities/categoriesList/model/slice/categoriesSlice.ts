import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICategory } from 'shared/types/ICategory';
import { ICategoriesSchema } from '../types/categoriesSchema';
import getCategories from '../services/getCategories';

const initialState: ICategoriesSchema = {
  categories: [],
  error: '',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.error = '';
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
      });
  },
});

export const categoriesActions = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
