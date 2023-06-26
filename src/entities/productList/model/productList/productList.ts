import { AxiosError, AxiosResponse } from 'axios';
import { createEffect, createStore } from 'effector';
import { $api } from 'shared/api/api';
import { IProduct } from 'shared/types/IProduct';
import { IOrder } from 'features/orders/model/types/orderSchema';
import { IProductSchema } from '../types/productSchema';

const initialState: IProductSchema = {
  products: [],
  product: null,
  error: '',
  isLoading: false,
};

export const getProductsFx = createEffect<string, IProduct[], Error>(
  async (categoryId) => {
    try {
      const res = await $api.get(`/items?category_id=${categoryId}`);
      if (!res.data) {
        throw new Error();
      }

      return res.data;
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;
      throw error;
    }
  },
);

type TGetProductByIdProps = {
  categoryId: string;
  productId: string;
};

export const getProductByIdFx = createEffect<TGetProductByIdProps, IProduct, Error>(
  async ({ categoryId, productId }) => {
    try {
      const response: AxiosResponse<IProduct[]> = await $api.get(`/items?category_id=${categoryId}`);
      if (!response.data) {
        throw new Error();
      }

      const productRes = response.data.find((item) => item.id === Number(productId));

      if (!productRes) {
        throw new Error('Такого товара нет');
      }

      return productRes;
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;
      throw error;
    }
  },
);

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

export const $products = createStore<IProductSchema>(initialState)
  .on(getProductsFx.doneData, (state, result) => ({
    ...state,
    products: result,
  }))
  .on(getProductsFx.failData, (state, result) => (
    {
      ...state,
      error: result.message,
    }
  ))
  .on(getProductByIdFx.doneData, (state, result) => ({
    ...state,
    product: result,
  }))
  .on(getProductByIdFx.failData, (state, result) => (
    {
      ...state,
      error: result.message,
    }
  ))
  .on(patchProductFx.doneData, (state) => state)
  .on(patchProductFx.failData, (state, result) => (
    {
      ...state,
      error: result.message,
    }
  ));
