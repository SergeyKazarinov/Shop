import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { $api } from 'shared/api/api';
import { categoriesReducer } from 'entities/categoriesList';
import { orderReducer } from 'features/orders';
import { productReducer } from 'widgets/ProductList';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  product: productReducer,
  order: orderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        api: $api,
      },
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
