import close from 'images/closeBtn.svg';
import { FC, useState } from 'react';
import NumericInput from 'react-numeric-input';
import { IProduct } from 'shared/types/IProduct';
import Button, { ThemeButtonEnum } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { orderActions } from '../../model/slice/orderSlice';
import s from './OrderItem.module.scss';

interface OrderItemProps {
  product: IProduct;
  maxQuantity: number;
}

const OrderItem: FC<OrderItemProps> = ({ product, maxQuantity }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  const onChange = (e: number) => {
    if (e === 0) {
      dispatch(orderActions.removeProduct(product.id));
    }
    setQuantity(e);
    dispatch(orderActions.setQuantity({ product, quantity: e }));
  };

  const handleClick = () => {
    dispatch(orderActions.removeProduct(product.id));
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
