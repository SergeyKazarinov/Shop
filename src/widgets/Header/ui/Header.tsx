import { BuyModal, OrderModal } from 'features/orders';
import { FC, memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPathArrayFromLocation } from 'shared/lib/getPathArrayFromLocation.ts/getPathArrayFromLocation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import Button, { ThemeButtonEnum } from 'shared/ui/Button/Button';
import s from './Header.module.scss';

const Header: FC = () => {
  const { pathname } = useLocation();
  const pathArray = getPathArrayFromLocation(pathname);
  const categories = useAppSelector((store) => store.categories.categories);
  const product = useAppSelector((store) => store.product.product);
  const totalQuantity = useAppSelector((store) => store.order.totalQuantity);
  const totalPrice = useAppSelector((store) => store.order.totalPrice);
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
  const [isOpenBuyModal, setIsOpenBuyModal] = useState(false);

  const toggleModal = () => {
    setIsOpenOrderModal((state) => !state);
  };

  let crumb: string | undefined;
  let isCategory = false;

  const breadcrumbs = pathArray.map((item, index) => {
    const routeTo = `/${pathArray.slice(0, index + 1).join('/')}`;

    if (index === 0) {
      const hasCategory = categories.find((el) => el.id === Number(item));
      if (hasCategory) {
        crumb = hasCategory.title;
        isCategory = true;
      }
    }

    if (index === 1) {
      crumb = product?.title;
    }

    const isLast = index === pathArray.length - 1;

    return isLast
      ? (<span key={index}>{` / ${crumb}`}</span>)
      : (
        <span key={index}>
          <span>/ </span>
          <Link to={routeTo} >{crumb}</Link>
        </span>
      );
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
        <h1 className={s.title}>{crumb || 'Магазин'}</h1>
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
      <div className={s.breadCrumbs}>
        {crumb && isCategory && breadcrumbs}
      </div>
    </header>
  );
};

export default memo(Header);
