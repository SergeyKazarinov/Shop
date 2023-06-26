import { IProduct } from 'shared/types/IProduct';
import { IProductSchema } from '../types/productSchema';

export const getProducts = (state: IProductSchema, result: IProduct[]) => ({
  ...state,
  products: result,
});
