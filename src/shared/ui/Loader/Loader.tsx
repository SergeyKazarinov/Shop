import { FC } from 'react';
import s from './Loader.module.scss';

const Loader: FC = () => (
  <div className={s.container}>
    <div className={s.loader}></div>
  </div>
);

export default Loader;
