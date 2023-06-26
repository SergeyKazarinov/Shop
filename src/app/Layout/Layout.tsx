import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/Header';

const Layout = () => (
  <>
    <Header />
    <main className='page-wrapper'>
      <Outlet />
    </main>
  </>
);

export default Layout;
