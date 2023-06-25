import { IProduct } from 'shared/types/IProduct';

export const getTotalPrice = (orders: IProduct[]) => {
  const sum = orders.reduce((acc, val) => acc + (val.price * val.quantity), 0);
  return Number(sum.toFixed(2));
};
