import { IProduct } from 'shared/types/IProduct';

export interface IOrderSchema {
  orders: IProduct[];
  totalPrice: number;
  totalQuantity: number;
}
