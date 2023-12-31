import { ORDER } from '@shared/consts/localStorage';

import { getTotalPrice } from '../../lib/getTotalPrice/getTotalPrice';
import { getTotalQuantity } from '../../lib/getTotalQuantity/getTotalQuantity';
import { IOrderSchema, ISetQuantity } from '../types/orderSchema';

export const setQuantityFn = (state: IOrderSchema, payload: ISetQuantity) => {
  state.orders = state.orders.map((item) => {
    if (item.product.id === payload.product.id) {
      item.product.quantity = payload.quantity;
    }

    return item;
  });
  state.totalPrice = getTotalPrice(state.orders);
  state.totalQuantity = getTotalQuantity(state.orders);
  localStorage.setItem(ORDER, JSON.stringify(state));

  return { ...state };
};
