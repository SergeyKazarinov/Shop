import { getTotalPrice } from 'features/orders/lib/getTotalPrice/getTotalPrice';
import { getTotalQuantity } from 'features/orders/lib/getTotalQuantity/getTotalQuantity';
import { ORDER } from 'shared/consts/localStorage';
import { IOrderSchema } from '../types/orderSchema';

export const removeProductFn = (state: IOrderSchema, payload: number) => {
  state.orders = state.orders.filter((item) => item.product.id !== payload);

  state.totalPrice = getTotalPrice(state.orders);
  state.totalQuantity = getTotalQuantity(state.orders);
  localStorage.setItem(ORDER, JSON.stringify(state));

  return { ...state };
};
