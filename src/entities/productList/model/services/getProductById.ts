import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { IProduct } from 'shared/types/IProduct';

type TGetProductByIdProps = string;

const getProductById = createAsyncThunk<IProduct, TGetProductByIdProps, IThunkConfig<string>>(
  'product/getProductById',
  async (productId, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get(`/items?id=${productId}`);
      if (!response.data) {
        throw new Error();
      }

      return response.data[0];
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('Error');
    }
  },
);

export default getProductById;
