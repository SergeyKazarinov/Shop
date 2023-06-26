import { CategoriesListPageLazy } from '@pages/CategoriesListPage';
import { ProductListPageLazy } from '@pages/ProductListPage';
import { ProductPageLazy } from '@pages/ProductPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutesEnum {
  CATEGORY = 'category',
  CATEGORY_ID = 'categoryId',
  PRODUCT_ID = 'productId',
}

export const RoutePath: Record<AppRoutesEnum, string> = {
  [AppRoutesEnum.CATEGORY]: '/',
  [AppRoutesEnum.CATEGORY_ID]: '/:categoryId',
  [AppRoutesEnum.PRODUCT_ID]: '/:categoryId/:productId',
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
  [AppRoutesEnum.PRODUCT_ID]: {
    path: RoutePath.productId,
    element: <ProductPageLazy />,
  },
};
