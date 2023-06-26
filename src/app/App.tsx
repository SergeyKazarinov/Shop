import { useEvent } from 'effector-react';
import { getCategoriesFx } from 'entities/categoriesList';
import getCategories from 'entities/categoriesList/model/services/getCategories';
import { orderActions, setOrderStateEvent } from 'features/orders';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppRouter } from './providers/routing';
import './styles/index.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const fetchCategories = useEvent(getCategoriesFx);

  useEffect(() => {
    // dispatch(getCategories());
    dispatch(orderActions.setState());
    fetchCategories();
    setOrderStateEvent();
  }, []);

  return (
    <div className='app'>
      <AppRouter />
    </div >
  );
};

export default App;
