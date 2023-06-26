import { AxiosError } from 'axios';
import { createEffect } from 'effector';
import { $api } from 'shared/api';
import { IProduct } from 'shared/types';

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
