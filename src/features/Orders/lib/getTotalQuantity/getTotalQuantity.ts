import { IOrder } from '@features/orders';

export const getTotalQuantity = (
  orders: IOrder[],
) => orders.reduce((acc, val) => acc + val.product.quantity, 0);
