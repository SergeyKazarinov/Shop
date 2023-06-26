import { ICategory } from '@shared/types';

import { ICategoriesSchema } from '../types/categoriesSchema';

export const setCategoriesFn = (state: ICategoriesSchema, result: ICategory[]) => (
  {
    ...state,
    categories: result,
  }
);
