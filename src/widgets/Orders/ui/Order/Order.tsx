import { FC, useState } from 'react';
import Button, { ThemeButtonEnum } from 'shared/ui/Button/Button';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import s from './Order.module.scss';
import OrderModal from '../OrderModal/OrderModal';

const Order: FC = () => {
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
  const totalQuantity = useAppSelector((store) => store.order.totalQuantity);
  const totalPrice = useAppSelector((store) => store.order.totalPrice);

  const toggleModal = () => {
    setIsOpenOrderModal((state) => !state);
  };

  const modalPortal = document.getElementById('basket') || document.body;

  return (
    <div id='basket' className={s.container} >
      <Button
        className={s.button}
        theme={ThemeButtonEnum.ORDER}
        onClick={toggleModal}
      >

        Корзина

        {totalPrice > 0 && <span className={s.price}>{totalPrice}</span>}
        {totalQuantity > 0 && <span className={s.quantity}>{totalQuantity}</span>}
      </Button>
      <OrderModal
        isOpen={isOpenOrderModal}
        onClose={toggleModal}
        modalPortal={modalPortal}
      />
    </div>
  );
};

export default Order;
