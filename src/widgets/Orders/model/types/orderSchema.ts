import { IProduct } from 'shared/types/IProduct';

export interface IOrderSchema {
  orders: IOrderItem[];
  totalPrice: number;
  totalQuantity: number;
}

export interface IOrderItem {
  product: IProduct;
  quantity: number;
}
