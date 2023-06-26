import { ICategory } from 'shared/types/ICategory';
import { ICategoriesSchema } from '../types/categoriesSchema';

export const setCategories = (state: ICategoriesSchema, result: ICategory[]) => (
  {
    ...state,
    categories: result,
  }
);
