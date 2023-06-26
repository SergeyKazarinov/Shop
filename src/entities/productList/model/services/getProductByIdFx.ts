import { AxiosError, AxiosResponse } from 'axios';
import { createEffect } from 'effector';
import { $api } from 'shared/api/api';
import { IProduct } from 'shared/types/IProduct';

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
