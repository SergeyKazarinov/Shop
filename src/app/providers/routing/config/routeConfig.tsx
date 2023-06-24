import { CategoriesListPageLazy } from 'pages/CategoiesListPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutesEnum {
  CATEGORY = 'category',
}

export const RoutePath: Record<AppRoutesEnum, string> = {
  [AppRoutesEnum.CATEGORY]: '/',
};

export const routeConfig: Record<AppRoutesEnum, RouteProps> = {
  [AppRoutesEnum.CATEGORY]: {
    path: RoutePath.category,
    element: <CategoriesListPageLazy />,
  },
};
