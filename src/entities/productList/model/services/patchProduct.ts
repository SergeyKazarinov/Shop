import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProvider';
import { AxiosResponse } from 'axios';
import { IOrder } from 'features/orders/model/types/orderSchema';
import { IProduct } from 'shared/types/IProduct';

type TPatchProductProps = IOrder[];

const patchProduct = createAsyncThunk<undefined, TPatchProductProps, IThunkConfig<string>>(
  'product/patchProducts',
  // eslint-disable-next-line
  async (orders, thunkAPI) => {
    try {
      orders.forEach(async (item) => {
        const response: AxiosResponse<IProduct> = await thunkAPI.extra.api.get(`/items/${item.product.id}`);
        if (!response.data) {
          throw new Error();
        }
        const newProduct = {
          ...response.data,
          quantity: response.data.quantity - item.product.quantity,
        };
        const data = await thunkAPI.extra.api.patch(`/items/${item.product.id}`, newProduct);
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
