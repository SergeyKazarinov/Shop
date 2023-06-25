import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import s from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}
const Loader: FC<LoaderProps> = ({ className = s.fixed }) => (
  <div className={classNames(s.container, {}, [className])}>
    <div className={s.loader}></div>
  </div>
);

export default Loader;
