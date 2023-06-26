import { IProduct } from 'shared/types/IProduct';
import { IProductSchema } from '../types/productSchema';

export const getProductsFn = (state: IProductSchema, result: IProduct[]) => ({
  ...state,
  products: result,
});
