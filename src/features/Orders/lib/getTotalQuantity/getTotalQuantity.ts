import { IProduct } from 'shared/types/IProduct';

export const getTotalQuantity = (
  orders: IProduct[],
) => orders.reduce((acc, val) => acc + val.quantity, 0);
