import { AxiosError } from 'axios';
import { createEffect } from 'effector';
import { $api } from 'shared/api/api';
import { ICategory } from 'shared/types/ICategory';

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
