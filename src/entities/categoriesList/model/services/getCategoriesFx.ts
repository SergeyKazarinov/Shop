import { AxiosError } from 'axios';
import { createEffect } from 'effector';
import { $api } from 'shared/api';
import { ICategory } from 'shared/types';

export const getCategoriesFx = createEffect<void, ICategory[], Error>(
  async () => {
    try {
      const res = await $api.get('/categories');
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
