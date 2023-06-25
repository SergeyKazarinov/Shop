import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { IProduct } from 'shared/types/IProduct';

type TGetProductsProps = string;

const getProducts = createAsyncThunk<IProduct[], TGetProductsProps, IThunkConfig<string>>(
  'product/getProducts',
  async (categoryId, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get(`/items?category_id=${categoryId}`);
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

export default getProducts;
