import { ORDER } from 'shared/consts/localStorage';
import { IOrder, IOrderSchema } from '../types/orderSchema';

export const addProductFn = (state: IOrderSchema, payload: IOrder) => {
  const hasProduct = state.orders.find(
    (item) => (
      item.product.id === payload.product.id
    ),
  );

  if (hasProduct) {
    state.orders = state.orders.map((item) => {
      if (item.product.id === payload.product.id) {
        item.product.quantity += payload.product.quantity;
      }

      return item;
    });
  } else {
    state.orders = [...state.orders, payload];
  }

  state.totalQuantity += payload.product.quantity;
  state.totalPrice += (payload.product.price * payload.product.quantity);
  state.totalPrice = Number(state.totalPrice.toFixed(2));

  localStorage.setItem(ORDER, JSON.stringify(state));

  return { ...state };
};
