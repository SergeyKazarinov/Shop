import { IOrder } from 'features/orders/model/types/orderSchema';

export const getTotalPrice = (orders: IOrder[]) => {
  const sum = orders.reduce((acc, val) => acc + (val.product.price * val.product.quantity), 0);
  return Number(sum.toFixed(2));
};
