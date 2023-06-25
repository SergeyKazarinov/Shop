import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
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
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export default getCategories;
