import getCategories from 'entities/categoriesList/model/services/getCategories';
import { orderActions } from 'features/orders';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppRouter } from './providers/routing';
import './styles/index.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(orderActions.setState());
  }, []);

  return (
    <div className='app'>
      <AppRouter />
    </div >
  );
};

export default App;
