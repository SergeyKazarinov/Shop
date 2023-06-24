import { ButtonHTMLAttributes, FC, memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import s from './Button.module.scss';

export enum ThemeButtonEnum {
  BUY = 'buy',
  ORDER = 'order',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButtonEnum;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  className = '',
  children,
  theme = '',
  disabled = false,
  ...otherProps
}) => {
  const mods: Record<string, boolean> = {
    [s.disabled]: disabled,
  };

  return (
    <button
      type="button"
      className={classNames(s.button, mods, [className, s[theme]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default memo(Button);
