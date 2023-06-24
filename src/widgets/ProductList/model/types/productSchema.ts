import { IProduct } from 'shared/types/IProduct';

export interface IProductSchema {
  products: IProduct[],
  error?: string,
}
