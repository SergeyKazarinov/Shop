import { ICategoriesSchema } from '../types/categoriesSchema';

export const setErrorMessageFn = (state: ICategoriesSchema, result: Error | string) => (
  result instanceof Error
    ? { ...state, error: result.message }
    : { ...state, error: result }
);
