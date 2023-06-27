import { $categories } from '@entities/categoriesList';
import { $products, getProductByIdFx, setErrorMessageEvent } from '@entities/productList';
import { $order, addProductEvent } from '@features/orders';
import { Button, ThemeButtonEnum } from '@shared/ui/Button';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { useEvent, useStore } from 'effector-react';
import image from 'images/item.jpg';
import { FC, useEffect, useState } from 'react';
import NumericInput from 'react-numeric-input';
import { useNavigate, useParams } from 'react-router-dom';

import s from './Product.module.scss';

type TParams = {
  categoryId: string;
  productId: string;
};

const Product: FC = () => {
  const { categoryId, productId } = useParams<TParams>();
  const navigate = useNavigate();
  const { product, error: errorMessage } = useStore($products);
  const { categories } = useStore($categories);
  const { orders } = useStore($order);
  const isLoading = useStore(getProductByIdFx.pending);
  const getProductById = useEvent(getProductByIdFx);

  const [quantity, setQuantity] = useState(0);

  const [availableQuantity, setAvailableQuantity] = useState(product?.quantity);
  const hasCategory = categories.find((item) => item.id === Number(categoryId));

  useEffect(() => {
    if (productId && categoryId) {
      getProductById({ categoryId, productId });
    }
  }, []);

  const category = categories.find((item) => item.id === Number(categoryId));

  useEffect(() => {
    const productInTheBasket = orders.find((item) => item.product.id === product?.id);
    if (productInTheBasket && product) {
      const qnty = product.quantity - productInTheBasket.product.quantity;
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
      addProductEvent({
        product: { ...product, quantity },
        maxQuantity: product.quantity,
      });
      setQuantity(0);
    }
  };

  const handleClick = () => {
    setErrorMessageEvent('');
    navigate('/', { replace: true });
  };

  if (errorMessage && !isLoading) {
    return <ErrorMessage title='Error' subtitle={errorMessage} onClick={handleClick} />;
  }

  if (!isLoading && (!product || !hasCategory)) {
    return <ErrorMessage title='404' subtitle='Такого товара нет' onClick={handleClick} />;
  }

  return (
    <div className={s.container}>
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
                max={availableQuantity}
                onChange={onChange}
                value={quantity}
                mobile={false}
                strict
              />
              <Button
                className={s.button}
                theme={ThemeButtonEnum.BUY}
                onClick={onBuy}
                disabled={!quantity || (quantity > product!.quantity)}
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
    </div>
  );
};

export default Product;
