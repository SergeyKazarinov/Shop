import { ORDER } from '@shared/consts/localStorage';

import { getTotalPrice } from '../../lib/getTotalPrice/getTotalPrice';
import { getTotalQuantity } from '../../lib/getTotalQuantity/getTotalQuantity';
import { IOrderSchema } from '../types/orderSchema';

export const removeProductFn = (state: IOrderSchema, payload: number) => {
  state.orders = state.orders.filter((item) => item.product.id !== payload);

  state.totalPrice = getTotalPrice(state.orders);
  state.totalQuantity = getTotalQuantity(state.orders);
  localStorage.setItem(ORDER, JSON.stringify(state));

  return { ...state };
};
