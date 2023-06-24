import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { $api } from 'shared/api/api';
import { categoriesReducer } from 'widgets/CategoriesList';

const rootReducer = combineReducers({
  categories: categoriesReducer,
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
