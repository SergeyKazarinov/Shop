import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from 'shared/ui/Loader/Loader';
import { routeConfig } from '../config/routeConfig';

const AppRouter: FC = () => {
  const routes = Object
    .values(routeConfig)
    .map(({ element, path }) => (
      <Route
        key={path}
        path={path}
        element={<div className="page-wrapper">{element}</div>}
      />
    ));

  return (
    <Suspense fallback={<Loader fixed />}>
      <Routes>
        {routes}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
