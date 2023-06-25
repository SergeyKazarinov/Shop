import { IProduct } from 'shared/types/IProduct';

export interface IOrderSchema {
  orders: IProduct[];
  totalPrice: number;
  totalQuantity: number;
}

export interface ISetQuantity {
  product: IProduct;
  quantity: number;
}
