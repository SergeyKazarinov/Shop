import { $categories } from '@entities/categoriesList';
import { $products } from '@entities/productList';
import { $order, BuyModal, OrderModal } from '@features/orders';
import { getPathArrayFromLocation } from '@shared/lib/getPathArrayFromLocation';
import { Button, ThemeButtonEnum } from '@shared/ui/Button';
import { useStore } from 'effector-react';
import { FC, memo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import s from './Header.module.scss';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const Header: FC = () => {
  const { pathname } = useLocation();
  const pathArray = getPathArrayFromLocation(pathname);

  const { categories } = useStore($categories);
  const { product } = useStore($products);
  const { totalPrice, totalQuantity } = useStore($order);

  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
  const [isOpenBuyModal, setIsOpenBuyModal] = useState(false);

  const toggleModal = () => {
    setIsOpenOrderModal((state) => !state);
  };

  let title: string | undefined;

  pathArray.forEach((item, index) => {
    if (index === 0) {
      const hasCategory = categories.find((el) => el.id === Number(item));
      if (hasCategory) {
        title = hasCategory.title;
      }
    }

    if (index === 1) {
      title = product?.title;
    }
  });

  const handleBuy = () => {
    setIsOpenOrderModal(false);
    setIsOpenBuyModal(true);
  };

  const handleCloseBuyModal = () => {
    setIsOpenBuyModal(false);
  };

  const modalPortal = document.getElementById('basket') || document.body;
  return (
    <header className={s.header}>
      <div className={s.flex} id='basket'>
        <h1 className={s.title}>{title || 'Магазин'}</h1>
        <Button
          className={s.button}
          theme={ThemeButtonEnum.ORDER}
          onClick={toggleModal}
        >

          Корзина

          {totalPrice > 0 && <span className={s.price}>{totalPrice}</span>}
          {totalQuantity > 0 && <span className={s.quantity}>{totalQuantity}</span>}
        </Button>
        {isOpenOrderModal && <OrderModal
          isOpen={isOpenOrderModal}
          onClose={toggleModal}
          modalPortal={modalPortal}
          onBuy={handleBuy}
        />}
        {isOpenBuyModal && <BuyModal isOpen={isOpenBuyModal} onClose={handleCloseBuyModal} />}
      </div>
      <Breadcrumbs />
    </header>
  );
};

export default memo(Header);
