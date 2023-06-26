import { ORDER } from '@shared/consts/localStorage';

import { IOrderSchema } from '../types/orderSchema';

export const removeOrderFn = (state: IOrderSchema) => {
  state.orders = [];
  state.totalPrice = 0;
  state.totalQuantity = 0;

  localStorage.removeItem(ORDER);
  return { ...state };
};
