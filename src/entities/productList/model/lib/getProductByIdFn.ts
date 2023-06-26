import { IProduct } from 'shared/types/IProduct';
import { IProductSchema } from '../types/productSchema';

export const getProductByIdFn = (state: IProductSchema, result: IProduct) => ({
  ...state,
  product: result,
});
