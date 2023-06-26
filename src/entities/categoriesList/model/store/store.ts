import { createStore } from 'effector';
import { getCategoriesFx } from '../services/getCategoriesFx';
import { ICategoriesSchema } from '../types/categoriesSchema';
import { setCategoriesFn } from '../lib/setCategoriesFn';
import { setErrorMessageFn } from '../lib/setErrorMessageFn';

const initialState: ICategoriesSchema = {
  categories: [],
  errorMessage: '',
  isLoading: false,
};

export const $categories = createStore<ICategoriesSchema>(initialState)
  .on(getCategoriesFx.doneData, setCategoriesFn)
  .on(getCategoriesFx.failData, setErrorMessageFn);
