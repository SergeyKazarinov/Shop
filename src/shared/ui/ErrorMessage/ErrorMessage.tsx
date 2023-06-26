import { classNames } from '@shared/lib/classNames/classNames';
import { FC } from 'react';

import s from './ErrorMessage.module.scss';
import Button, { ThemeButtonEnum } from '../Button/Button';

export enum SizeTitleEnum {
  NORMAL = 'default',
  LARGE = 'large',
}

interface ErrorMessageProps {
  className?: string;
  title?: string;
  subtitle: string;
  sizeTitle?: SizeTitleEnum;
  onClick?: () => void;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
  className = '',
  sizeTitle = SizeTitleEnum.NORMAL,
  title,
  subtitle,
  onClick,
}) => (
  <div className={classNames(s.errorMessage, {}, [className])}>
    <h2 className={classNames('', {}, [s[sizeTitle]])}>{title}</h2>
    <h3>{subtitle}</h3>
    {onClick && <Button
      theme={ThemeButtonEnum.CLEAR}
      onClick={onClick}
      className={s.link}
    >
      На главную
    </Button>}
  </div>
);

export default ErrorMessage;
