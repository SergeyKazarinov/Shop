import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import Button, { ThemeButtonEnum } from '../Button/Button';
import s from './NotFound.module.scss';

export enum SizeTitleEnum {
  NORMAL = 'default',
  LARGE = 'large',
}

interface NotFoundProps {
  className?: string;
  title?: string;
  subtitle: string;
  sizeTitle?: SizeTitleEnum;
}

const NotFound: FC<NotFoundProps> = ({
  className = '',
  sizeTitle = SizeTitleEnum.NORMAL,
  title,
  subtitle,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/', { replace: true });
  };
  return (
    <div className={classNames(s.notFound, {}, [className])}>
      <h2 className={classNames('', {}, [s[sizeTitle]])}>{title}</h2>
      <h3>{subtitle}</h3>
      <Button
        theme={ThemeButtonEnum.CLEAR}
        onClick={handleClick}
        className={s.link}
      >
        На главную
      </Button>
    </div>
  );
};

export default NotFound;
