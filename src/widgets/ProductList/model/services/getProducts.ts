import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
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
      return thunkAPI.rejectWithValue('Error');
    }
  },
);

export default getProducts;
