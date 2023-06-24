import { FC } from 'react';
import { AppRouter } from './providers/routing';
import './styles/index.scss';

const App: FC = () => (
  <div className='app'>
    <main>
      <AppRouter />
    </main>
  </div >
);

export default App;
