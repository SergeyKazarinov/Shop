import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { ICategory } from 'shared/types/ICategory';

const getCategories = createAsyncThunk<ICategory[], undefined, IThunkConfig<string>>(
  'categories/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get('/categories');
      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('Error');
    }
  },
);

export default getCategories;
