import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ORDER } from 'shared/consts/localStorage';
import { IProduct } from 'shared/types/IProduct';
import { IOrderSchema } from '../types/orderSchema';

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
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const hasProduct = state.orders.find(
        (item) => (
          item.id === action.payload.id
        ),
      );

      if (hasProduct) {
        state.orders = state.orders.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += action.payload.quantity;
          }

          return item;
        });
      } else {
        state.orders = [...state.orders, action.payload];
      }

      state.totalQuantity += action.payload.quantity;
      state.totalPrice += (action.payload.price * action.payload.quantity);
      state.totalPrice = Number(state.totalPrice.toFixed(2));

      localStorage.setItem(ORDER, JSON.stringify(state));
      // localStorage.removeItem(ORDER);
    },
  },
});

export const orderActions = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
