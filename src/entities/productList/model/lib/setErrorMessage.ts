import { IProductSchema } from '../types/productSchema';

export const setErrorMessage = (state: IProductSchema, result: Error) => (
  {
    ...state,
    error: result.message,
  }
);
