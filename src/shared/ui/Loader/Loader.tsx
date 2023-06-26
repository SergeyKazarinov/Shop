import { classNames } from '@shared/lib/classNames/classNames';
import { FC } from 'react';

import s from './Loader.module.scss';

interface LoaderProps {
  className?: string;
  fixed?: boolean;
}
const Loader: FC<LoaderProps> = ({ className = '', fixed = false }) => (
  <div className={classNames(s.container, { [s.fixed]: fixed }, [className])}>
    <div className={s.loader}></div>
  </div>
);

export default Loader;
