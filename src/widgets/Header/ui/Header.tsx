import { FC } from 'react';
import s from './Header.module.scss';

const Header: FC = () => {
  console.log('');
  return (
    <header className={s.header}>
      <h1 className={s.title}>Товары</h1>
    </header>
  );
};

export default Header;
