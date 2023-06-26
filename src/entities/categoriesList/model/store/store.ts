import { createStore } from 'effector';
import { getCategoriesFx } from '../services/getCategoriesFx';
import { ICategoriesSchema } from '../types/categoriesSchema';
import { setCategories } from '../lib/setCategories';
import { setErrorMessage } from '../lib/setErrorMessage';

const initialState: ICategoriesSchema = {
  categories: [],
  errorMessage: '',
  isLoading: false,
};

export const $categories = createStore<ICategoriesSchema>(initialState)
  .on(getCategoriesFx.doneData, setCategories)
  .on(getCategoriesFx.failData, setErrorMessage);
