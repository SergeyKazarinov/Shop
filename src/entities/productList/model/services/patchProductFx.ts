import { AxiosError, AxiosResponse } from 'axios';
import { createEffect } from 'effector';
import { IOrder } from 'features/orders/model/types/orderSchema';
import { $api } from 'shared/api/api';
import { IProduct } from 'shared/types/IProduct';

type TPatchProductProps = IOrder[];

export const patchProductFx = createEffect<TPatchProductProps, void, Error>(
  async (orders) => {
    try {
      orders.forEach(async (item) => {
        const response: AxiosResponse<IProduct> = await $api.get(`/items/${item.product.id}`);
        if (!response.data) {
          throw new Error();
        }
        const newProduct = {
          ...response.data,
          quantity: response.data.quantity - item.product.quantity,
        };
        const data = await $api.patch(`/items/${item.product.id}`, newProduct);
        if (!data.data) {
          throw new Error();
        }
      });
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;
      throw error;
    }
  },
);
