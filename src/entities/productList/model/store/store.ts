import { createStore } from 'effector';
import { getProductByIdFx } from '../services/getProductByIdFx';
import { getProductsFx } from '../services/getProductsFx';
import { patchProductFx } from '../services/patchProductFx';
import { IProductSchema } from '../types/productSchema';
import { getProducts } from '../lib/getProduct';
import { setErrorMessage } from '../lib/setErrorMessage';
import { getProductById } from '../lib/getProductById';

const initialState: IProductSchema = {
  products: [],
  product: null,
  error: '',
  isLoading: false,
};

export const $products = createStore<IProductSchema>(initialState)
  .on(getProductsFx.doneData, getProducts)
  .on(getProductsFx.failData, setErrorMessage)
  .on(getProductByIdFx.doneData, getProductById)
  .on(getProductByIdFx.failData, setErrorMessage)
  .on(patchProductFx.doneData, (state) => state)
  .on(patchProductFx.failData, setErrorMessage);
