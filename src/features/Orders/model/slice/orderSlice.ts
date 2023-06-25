import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ORDER } from 'shared/consts/localStorage';
import { getTotalPrice } from '../../lib/getTotalPrice/getTotalPrice';
import { getTotalQuantity } from '../../lib/getTotalQuantity/getTotalQuantity';
import { IOrder, IOrderSchema, ISetQuantity } from '../types/orderSchema';

const initialState: IOrderSchema = {
  orders: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

    setState: (state) => {
      const localState = localStorage.getItem(ORDER);
      if (localState) {
        const data: IOrderSchema = JSON.parse(localState);
        state.orders = data.orders;
        state.totalPrice = data.totalPrice;
        state.totalQuantity = data.totalQuantity;
      }
    },
    addProduct: (state, action: PayloadAction<IOrder>) => {
      const hasProduct = state.orders.find(
        (item) => (
          item.product.id === action.payload.product.id
        ),
      );

      if (hasProduct) {
        state.orders = state.orders.map((item) => {
          if (item.product.id === action.payload.product.id) {
            item.product.quantity += action.payload.product.quantity;
          }

          return item;
        });
      } else {
        state.orders = [...state.orders, action.payload];
      }

      state.totalQuantity += action.payload.product.quantity;
      state.totalPrice += (action.payload.product.price * action.payload.product.quantity);
      state.totalPrice = Number(state.totalPrice.toFixed(2));

      localStorage.setItem(ORDER, JSON.stringify(state));
    },
    setQuantity: (state, action: PayloadAction<ISetQuantity>) => {
      state.orders = state.orders.map((item) => {
        if (item.product.id === action.payload.product.id) {
          item.product.quantity = action.payload.quantity;
        }

        return item;
      });
      state.totalPrice = getTotalPrice(state.orders);
      state.totalQuantity = getTotalQuantity(state.orders);
      localStorage.setItem(ORDER, JSON.stringify(state));
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((item) => item.product.id !== action.payload);

      state.totalPrice = getTotalPrice(state.orders);
      state.totalQuantity = getTotalQuantity(state.orders);
      localStorage.setItem(ORDER, JSON.stringify(state));
    },
    removeOrder: (state) => {
      state.orders = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;

      localStorage.removeItem(ORDER);
    },
  },
});

export const orderActions = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
