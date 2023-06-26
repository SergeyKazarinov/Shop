import { useEvent } from 'effector-react';
import { getCategoriesFx } from 'entities/categoriesList';
import { setOrderStateEvent } from 'features/orders';
import { FC, useEffect } from 'react';
import { AppRouter } from './providers/routing';
import './styles/index.scss';

const App: FC = () => {
  const getCategories = useEvent(getCategoriesFx);

  useEffect(() => {
    getCategories();
    setOrderStateEvent();
  }, []);

  return (
    <div className='app'>
      <AppRouter />
    </div >
  );
};

export default App;
