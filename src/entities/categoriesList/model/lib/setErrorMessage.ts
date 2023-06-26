import { ICategoriesSchema } from '../types/categoriesSchema';

export const setErrorMessage = (state: ICategoriesSchema, result: Error) => (
  {
    ...state,
    errorMessage: result.message,
  }
);
