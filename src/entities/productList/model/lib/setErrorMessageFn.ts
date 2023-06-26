import { IProductSchema } from '../types/productSchema';

export const setErrorMessageFn = (state: IProductSchema, result: Error | string) => (
  result instanceof Error
    ? { ...state, error: result.message }
    : { ...state, error: result }
);
