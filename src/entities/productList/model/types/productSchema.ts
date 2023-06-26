import { IProduct } from 'shared/types/IProduct';

export interface IProductSchema {
  products: IProduct[];
  product: IProduct | null;
  error?: string;
  isLoading: boolean;
}
