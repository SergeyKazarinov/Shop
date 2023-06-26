import { IProduct } from 'shared/types';

export interface IProductSchema {
  products: IProduct[];
  product: IProduct | null;
  error?: string;
  isLoading: boolean;
}
