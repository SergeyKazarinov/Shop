import { createEvent, createStore } from 'effector';

import { getProductByIdFn } from '../lib/getProductByIdFn';
import { getProductsFn } from '../lib/getProductFn';
import { setErrorMessageFn } from '../lib/setErrorMessageFn';
import { getProductByIdFx } from '../services/getProductByIdFx';
import { getProductsFx } from '../services/getProductsFx';
import { patchProductFx } from '../services/patchProductFx';
import { IProductSchema } from '../types/productSchema';

const initialState: IProductSchema = {
  products: [],
  product: null,
  error: '',
  isLoading: false,
};

export const setErrorMessageEvent = createEvent<string>();

export const $products = createStore<IProductSchema>(initialState)
  .on(getProductsFx.doneData, getProductsFn)
  .on(getProductsFx.failData, setErrorMessageFn)
  .on(getProductByIdFx.doneData, getProductByIdFn)
  .on(getProductByIdFx.failData, setErrorMessageFn)
  .on(patchProductFx.doneData, (state) => state)
  .on(patchProductFx.failData, setErrorMessageFn)
  .on(setErrorMessageEvent, setErrorMessageFn);
