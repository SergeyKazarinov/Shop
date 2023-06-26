import { Header } from '@widgets/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <>
    <Header />
    <main className='page-wrapper'>
      <Outlet />
    </main>
  </>
);

export default Layout;
