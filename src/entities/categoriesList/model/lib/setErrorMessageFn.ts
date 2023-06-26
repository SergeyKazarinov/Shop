import { ICategoriesSchema } from '../types/categoriesSchema';

export const setErrorMessageFn = (state: ICategoriesSchema, result: Error) => (
  {
    ...state,
    errorMessage: result.message,
  }
);
