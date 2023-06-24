import { CategoriesListPageLazy } from 'pages/CategoriesListPage';
import { ProductListPageLazy } from 'pages/ProductListPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutesEnum {
  CATEGORY = 'category',
  CATEGORY_ID = 'categoryId',
}

export const RoutePath: Record<AppRoutesEnum, string> = {
  [AppRoutesEnum.CATEGORY]: '/',
  [AppRoutesEnum.CATEGORY_ID]: '/:categoryId',
};

export const routeConfig: Record<AppRoutesEnum, RouteProps> = {
  [AppRoutesEnum.CATEGORY]: {
    path: RoutePath.category,
    element: <CategoriesListPageLazy />,
  },
  [AppRoutesEnum.CATEGORY_ID]: {
    path: RoutePath.categoryId,
    element: <ProductListPageLazy />,
  },
};
