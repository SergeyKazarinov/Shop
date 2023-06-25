import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { IProduct } from 'shared/types/IProduct';
import Button, { ThemeButtonEnum } from 'shared/ui/Button/Button';
import OrderItem from '../OrderItem/OrderItem';
import s from './OrderForm.module.scss';

interface OrderFromProps {
  onBuy: (orders: IProduct[]) => void;
}

const OrderForm: FC<OrderFromProps> = ({ onBuy }) => {
  const orders = useAppSelector((store) => store.order.orders);
  const totalQuantity = useAppSelector((store) => store.order.totalQuantity);
  const totalPrice = useAppSelector((store) => store.order.totalPrice);

  const orderList = orders.map((item) => <OrderItem product={item} key={item.id} />);

  const handleBuy = () => {
    onBuy(orders);
  };

  return (
    <div className={s.container}>
      <div className={s.list}>
        {orderList}
      </div>
      <div className={s.total}>

        {totalPrice > 0 && <span>{`Цена: ${totalPrice}`}</span>}
        {totalQuantity > 0 && <span>{`Кол-во: ${totalQuantity}`}</span>}
        <Button theme={ThemeButtonEnum.BUY} onClick={handleBuy}>Оплатить</Button>
      </div>
    </div>
  );
};

export default OrderForm;
