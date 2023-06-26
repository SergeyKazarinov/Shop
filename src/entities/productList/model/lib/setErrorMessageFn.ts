import { IProductSchema } from '../types/productSchema';

export const setErrorMessageFn = (state: IProductSchema, result: Error) => (
  {
    ...state,
    error: result.message,
  }
);
