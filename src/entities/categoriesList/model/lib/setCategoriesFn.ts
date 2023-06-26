import { ICategory } from 'shared/types/ICategory';
import { ICategoriesSchema } from '../types/categoriesSchema';

export const setCategoriesFn = (state: ICategoriesSchema, result: ICategory[]) => (
  {
    ...state,
    categories: result,
  }
);
