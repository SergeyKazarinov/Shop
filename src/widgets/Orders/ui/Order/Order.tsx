import { FC } from 'react';
import Button, { ThemeButtonEnum } from 'shared/ui/Button/Button';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import s from './Order.module.scss';

const Order: FC = () => {
  const totalQuantity = useAppSelector((store) => store.order.totalQuantity);
  const totalPrice = useAppSelector((store) => store.order.totalPrice);

  return (
    <div className={s.container}>
      <Button className={s.button} theme={ThemeButtonEnum.ORDER}>
        Корзина

        {totalPrice > 0 && <span className={s.price}>{totalPrice}</span>}
        {totalQuantity > 0 && <span className={s.quantity}>{totalQuantity}</span>}
      </Button>
    </div>
  );
};

export default Order;
