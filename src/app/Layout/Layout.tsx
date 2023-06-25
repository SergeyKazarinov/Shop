import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/Header';

const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;
