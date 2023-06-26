import { ORDER } from '@shared/consts/localStorage';

import { IOrderSchema } from '../types/orderSchema';

export const setOrderStateFn = (state: IOrderSchema) => {
  const localState = localStorage.getItem(ORDER);
  if (localState) {
    const data: IOrderSchema = JSON.parse(localState);
    return data;
  }
  return { ...state };
};
