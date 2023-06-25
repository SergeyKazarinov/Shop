import { IProduct } from 'shared/types/IProduct';

export interface IOrderSchema {
  orders: IOrder[];
  totalPrice: number;
  totalQuantity: number;
}

export interface IOrder {
  product: IProduct;
  maxQuantity: number;
}

export interface ISetQuantity {
  product: IProduct;
  quantity: number;
}
