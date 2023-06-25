import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import Button, { ThemeButtonEnum } from 'shared/ui/Button/Button';
import OrderItem from '../OrderItem/OrderItem';
import s from './OrderForm.module.scss';

interface OrderFromProps {
  onBuy: () => void;
}

const OrderForm: FC<OrderFromProps> = ({ onBuy }) => {
  const orders = useAppSelector((store) => store.order.orders);
  const totalQuantity = useAppSelector((store) => store.order.totalQuantity);
  const totalPrice = useAppSelector((store) => store.order.totalPrice);

  const orderList = orders.map((item) => (
    <OrderItem product={item.product} maxQuantity={item.maxQuantity} key={item.product.id} />
  ));

  if (orders.length === 0) {
    return (<div className={s.container}>
      <div className={s.text}>Товаров нет в корзине</div>
    </div>);
  }

  return (
    <div className={s.container}>
      <div className={s.list}>
        {orderList}
      </div>
      <div className={s.total}>

        {totalPrice > 0 && <span>{`Цена: ${totalPrice}`}</span>}
        {totalQuantity > 0 && <span>{`Кол-во: ${totalQuantity}`}</span>}
        <Button
          theme={ThemeButtonEnum.BUY}
          onClick={onBuy}
        >
          Оплатить
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
