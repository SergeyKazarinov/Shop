import image from 'images/item.jpg';
import { FC, useEffect, useState } from 'react';
import NumericInput from 'react-numeric-input';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import getProductById from 'widgets/ProductList/model/services/getProductById';
import Button, { ThemeButtonEnum } from 'shared/ui/Button/Button';
import { orderActions } from 'widgets/Orders';
import s from './Product.module.scss';

type TParams = {
  categoryId: string;
  productId: string;
};

const Product: FC = () => {
  const { productId, categoryId } = useParams<TParams>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((store) => store.product.product);
  const categories = useAppSelector((store) => store.categories.categories);
  const orders = useAppSelector((store) => store.order.orders);
  const [quantity, setQuantity] = useState(0);
  const [availableQuantity, setAvailableQuantity] = useState(product?.quantity);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, []);

  const category = categories.find((item) => item.id === Number(categoryId));

  useEffect(() => {
    const productInTheBasket = orders.find((item) => item.id === product?.id);
    if (productInTheBasket && product) {
      const qnty = product.quantity - productInTheBasket.quantity;
      setAvailableQuantity(qnty);
    } else if (product) {
      setAvailableQuantity(product.quantity);
    }
  }, [product, orders]);

  const onChange = (e: number) => {
    setQuantity(e);
  };

  const onBuy = () => {
    if (product) {
      dispatch(orderActions.addProduct({ ...product, quantity }));
    }
  };

  return (
    <section className={s.container}>
      <div className={s.flex}>
        <div className={s.imageWrapper}>
          <img src={image} className={s.image} alt='Изображение товара' />
        </div>
        <div className={s.flexColumn}>
          {availableQuantity
            ? <>
              <NumericInput
                className={s.input}
                min={0}
                max={product?.quantity}
                onChange={onChange}
                value={quantity}
                mobile={false}
              />
              <Button
                className={s.button}
                theme={ThemeButtonEnum.BUY}
                onClick={onBuy}
              >
                Купить
              </Button>
            </>
            : <span>Товар закончился</span>
          }
        </div>
      </div>
      <h2 className={s.title}>{product?.title}</h2>
      <h3 className={s.subtitle}>Описание:</h3>
      <p className={s.description}>
        <span className={s.bold}>Цена: </span>
        {product?.price}
      </p>
      <p className={s.description}>
        <span className={s.bold}>Категория: </span>
        {category?.title || 'Без категории'}
      </p>
      <p className={s.description}>
        <span className={s.bold}>Наличие: </span>
        {product?.quantity}
      </p>
      {!!availableQuantity && (<p className={s.description}>
        <span className={s.bold}>Доступно для заказа: </span>
        {availableQuantity}
      </p>)}
    </section>
  );
};

export default Product;
