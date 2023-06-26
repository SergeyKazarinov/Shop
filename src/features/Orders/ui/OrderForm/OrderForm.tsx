import { $order } from '@features/orders';
import { Button, ThemeButtonEnum } from '@shared/ui/Button';
import { useStore } from 'effector-react';
import { FC } from 'react';

import s from './OrderForm.module.scss';
import OrderItem from '../OrderItem/OrderItem';

interface OrderFromProps {
  onBuy: () => void;
}

const OrderForm: FC<OrderFromProps> = ({ onBuy }) => {
  const { orders, totalPrice, totalQuantity } = useStore($order);

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
