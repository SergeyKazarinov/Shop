import { removeProductEvent, setQuantityEvent } from '@features/orders';
import { IProduct } from '@shared/types';
import { Button, ThemeButtonEnum } from '@shared/ui/Button';
import close from 'images/closeBtn.svg';
import { FC, useState } from 'react';
import NumericInput from 'react-numeric-input';

import s from './OrderItem.module.scss';

interface OrderItemProps {
  product: IProduct;
  maxQuantity: number;
}

const OrderItem: FC<OrderItemProps> = ({ product, maxQuantity }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const onChange = (e: number) => {
    if (e === 0) {
      removeProductEvent(product.id);
    }
    setQuantity(e);
    setQuantityEvent({ product, quantity: e });
  };

  const handleClick = () => {
    removeProductEvent(product.id);
  };

  return (
    <div className={s.flex}>
      <p className={s.title}>{product.title}</p>
      <NumericInput
        className={s.input}
        value={quantity} min={0}
        max={maxQuantity}
        onChange={onChange}
        strict
      />
      <Button
        theme={ThemeButtonEnum.CLEAR}
        onClick={handleClick}
      >
        <img className={s.image} src={close} alt='Крестик' />
      </Button>
    </div>
  );
};

export default OrderItem;
