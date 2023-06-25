import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { AxiosResponse } from 'axios';
import { IProduct } from 'shared/types/IProduct';

type TGetProductByIdProps = {
  categoryId: string;
  productId: string;
};

const getProductById = createAsyncThunk<IProduct, TGetProductByIdProps, IThunkConfig<string>>(
  'product/getProductById',
  async ({ categoryId, productId }, thunkAPI) => {
    try {
      const response: AxiosResponse<IProduct[]> = await thunkAPI.extra.api.get(`/items?category_id=${categoryId}`);
      if (!response.data) {
        throw new Error();
      }

      const productRes = response.data.find((item) => item.id === Number(productId));

      if (!productRes) {
        throw new Error();
      }

      return productRes;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('Error');
    }
  },
);

export default getProductById;
