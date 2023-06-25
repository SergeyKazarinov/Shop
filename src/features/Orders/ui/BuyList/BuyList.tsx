import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { getTotalPrice } from '../../lib/getTotalPrice/getTotalPrice';
import s from './BuyList.module.scss';

interface BuyListProps {

}

const BuyList: FC<BuyListProps> = () => {
  const orders = useAppSelector((store) => store.order.orders);

  const orderList = orders.map((item) => (
    <div key={item.product.id} className={s.flex}>
      <div>
        <span>{item.product.title} </span>
        <span>({item.product.quantity})</span>
      </div>
      <div>{getTotalPrice([item])} р.</div>
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
