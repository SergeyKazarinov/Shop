import { createEvent, createStore } from 'effector';

import { setCategoriesFn } from '../lib/setCategoriesFn';
import { setErrorMessageFn } from '../lib/setErrorMessageFn';
import { getCategoriesFx } from '../services/getCategoriesFx';
import { ICategoriesSchema } from '../types/categoriesSchema';

const initialState: ICategoriesSchema = {
  categories: [],
  errorMessage: '',
  isLoading: false,
};

export const setErrorMessageEvent = createEvent<string>();

export const $categories = createStore<ICategoriesSchema>(initialState)
  .on(getCategoriesFx.doneData, setCategoriesFn)
  .on(getCategoriesFx.failData, setErrorMessageFn)
  .on(setErrorMessageEvent, setErrorMessageFn);
