import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import Button, { ThemeButtonEnum } from 'shared/ui/Button/Button';
import OrderItem from '../OrderItem/OrderItem';
import s from './OrderForm.module.scss';

const OrderForm: FC = () => {
  const orders = useAppSelector((store) => store.order.orders);
  const totalQuantity = useAppSelector((store) => store.order.totalQuantity);
  const totalPrice = useAppSelector((store) => store.order.totalPrice);

  const orderList = orders.map((item) => <OrderItem product={item} key={item.id} />);

  return (
    <div className={s.container}>
      <div className={s.list}>
        {orderList}
      </div>
      <div className={s.total}>

        {totalPrice > 0 && <span>{`Цена: ${totalPrice}`}</span>}
        {totalQuantity > 0 && <span>{`Кол-во: ${totalQuantity}`}</span>}
        <Button theme={ThemeButtonEnum.BUY}>Оплатить</Button>
      </div>
    </div>
  );
};

export default OrderForm;
