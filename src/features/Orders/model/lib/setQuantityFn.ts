import { getTotalPrice } from 'features/orders/lib/getTotalPrice/getTotalPrice';
import { getTotalQuantity } from 'features/orders/lib/getTotalQuantity/getTotalQuantity';
import { ORDER } from 'shared/consts/localStorage';
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
};
