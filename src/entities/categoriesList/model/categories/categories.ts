import { AxiosError } from 'axios';
import { createEffect, createStore } from 'effector';
import { $api } from 'shared/api/api';
import { ICategory } from 'shared/types/ICategory';
import { ICategoriesSchema } from '../types/categoriesSchema';

const initialState: ICategoriesSchema = {
  categories: [],
  errorMessage: '',
  isLoading: false,
};

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

export const $categories = createStore<ICategoriesSchema>(initialState)
  .on(getCategoriesFx.doneData, (state, result) => (
    {
      ...state,
      categories: result,
    }
  ))
  .on(getCategoriesFx.failData, (state, result) => (
    {
      ...state,
      errorMessage: result.message,
    }
  ));
