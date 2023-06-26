import { createEvent, createStore } from 'effector';
import { addProductFn } from '../lib/addProductFn';
import { removeOrderFn } from '../lib/removeOrderFn';
import { removeProductFn } from '../lib/removeProductFn';
import { setOrderStateFn } from '../lib/setOrderStateFn';
import { setQuantityFn } from '../lib/setQuantityFn';
import { IOrder, IOrderSchema, ISetQuantity } from '../types/orderSchema';

const initialState: IOrderSchema = {
  orders: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const setOrderStateEvent = createEvent();
export const addProductEvent = createEvent<IOrder>();
export const setQuantityEvent = createEvent<ISetQuantity>();
export const removeProductEvent = createEvent<number>();
export const removeOrderEvent = createEvent<number>();

export const $order = createStore<IOrderSchema>(initialState)
  .on(setOrderStateEvent, setOrderStateFn)
  .on(addProductEvent, addProductFn)
  .on(setQuantityEvent, setQuantityFn)
  .on(removeProductEvent, removeProductFn)
  .on(removeOrderEvent, removeOrderFn);
