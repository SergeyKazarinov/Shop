import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { AxiosResponse } from 'axios';
import { IProduct } from 'shared/types/IProduct';

type TPatchProductProps = IProduct[];

const patchProduct = createAsyncThunk<undefined, TPatchProductProps, IThunkConfig<string>>(
  'product/patchProducts',
  // eslint-disable-next-line
  async (orders, thunkAPI) => {
    try {
      orders.forEach(async (item) => {
        const response: AxiosResponse<IProduct> = await thunkAPI.extra.api.get(`/items/${item.id}`);
        if (!response.data) {
          throw new Error();
        }
        const newProduct = { ...response.data, quantity: response.data.quantity - item.quantity };
        const data = await thunkAPI.extra.api.patch(`/items/${item.id}`, newProduct);
        if (!data.data) {
          throw new Error();
        }
      });
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('Error');
    }
  },
);

export default patchProduct;
