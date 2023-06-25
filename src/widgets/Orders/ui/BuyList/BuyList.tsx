import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import s from './BuyList.module.scss';

interface BuyListProps {

}

const BuyList: FC<BuyListProps> = () => {
  const orders = useAppSelector((store) => store.order.orders);

  const orderList = orders.map((item) => (
    <div className={s.flex}>
      <div>
        <span>{item.title} </span>
        <span>({item.quantity})</span>
      </div>
      <div>{item.price * item.quantity} р.</div>
    </div>
  ));
  return (
    <>
      {orderList}
      <p>Оплата прошла успешно!</p>
    </>
  );
};

export default BuyList;
