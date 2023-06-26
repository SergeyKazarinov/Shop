import { $order } from '@features/orders';
import { useStore } from 'effector-react';
import { FC } from 'react';

import s from './BuyList.module.scss';
import { getTotalPrice } from '../../lib/getTotalPrice/getTotalPrice';

const BuyList: FC = () => {
  const { orders } = useStore($order);

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
